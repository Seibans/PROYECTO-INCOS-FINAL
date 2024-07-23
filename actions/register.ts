"use server";
//Esto es un server action
import * as z from "zod";
import { RegisterSchema } from "@/schemas"; 
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import { enviarCorreodeVerificacion } from "@/lib/mail";
import { formatName } from "@/lib/formatearNombre";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Campos Inválidos!"};
    }

    const { email, password, name, celular } = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {error: "El usuario ya existe!"};
    }
    const nombreFormateado = formatName(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name: nombreFormateado,
            celular: celular ? celular.replaceAll(" ", "") : null,
        },
    });

    // const verificationToken = await generateVerificationToken(email);

    //TODO: enviar correo de confirmación


    // await enviarCorreodeVerificacion(
    //     verificationToken.email, 
    //     verificationToken.token
    // );

    return {success: "Usuario registrado correctamente, inicia sessión con tus credenciales!"};
    // return {success: "Confirmación de correo enviada!"}; 
};