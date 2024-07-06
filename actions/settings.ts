"use server";
//Esto es un server action
import * as z from "zod";
import { unstable_update } from "@/auth";

import {db} from "@/lib/db";
import { ConfiguracionSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { usuarioActual } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { enviarCorreodeVerificacion } from "@/lib/mail";
import bcrypt from "bcryptjs"

export const settings = async (values: z.infer<typeof ConfiguracionSchema>) => {
    const usuario = await usuarioActual();

    if (!usuario) {
        return { error: "No tienes permisos para cambiar la configuración" };
    } 

	// lo de abajo es para comprobar, si realmente existe en la base de datos el usuario actual
	//y no es una sesssión sobrante

    const dbUsuario = await getUserById(Number(usuario.id));

    if (!dbUsuario) {
        return { error: "No se ha podido obtener la configuración" };
    }

    // Control para que un usuario logueado con google no cambie esos valores
    if(usuario.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.nuevoPassword = undefined;
        values.authDobleFactor = undefined;
    }

    if(values.email && values.email !== usuario.email){
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== Number(usuario.id)) {
            return {error: "El Correo ya se encuentra en uso"}
        }

        const tokenVerificacion = await generateVerificationToken(values.email);

        await enviarCorreodeVerificacion(
            tokenVerificacion.email,
            tokenVerificacion.token,
        )

        return {success: "Correo de Verificación Enviado!   "}
    }

    if(values.password && values.nuevoPassword && dbUsuario.password){
        const matchPasswords = await bcrypt.compare(
            values.password,
            dbUsuario.password
        );

        if(!matchPasswords){
            return {error: "Contraseña Incorrecta!"}
        }

        const hashPassword = await bcrypt.hash(
            values.nuevoPassword,
            10,
        );

        values.password = hashPassword;
        values.nuevoPassword = undefined;
    }
	//EXTRAE EL NOMBRE PERO ES OPCIONAL ASI QUE PODRIA DAR UN ERROR
    // const { nombre } = values;

    // if (nombre) {
    //     await db.user.update({
    //         where: {
    //             id: dbUsuario.id
    //         },
    //         data: {
    //             name: nombre
    //         }
    //     });
    // }

	// lo de Antonio no extrae el nombre, porque no lo necesitamos y actualiza todo
	const usuarioActualizado = await db.user.update({
		where: {
			id: dbUsuario.id
		},
		data: {
			...values,
		}
	});


    unstable_update({
        user: {
            name: usuarioActualizado.name,
            email: usuarioActualizado.email,
            authDobleFactor: usuarioActualizado.authDobleFactor,
            rol: usuarioActualizado.rol
        }
    });

    return { success: "Configuración actualizada" };
};