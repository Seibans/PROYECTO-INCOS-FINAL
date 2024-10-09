"use server";
import * as z from "zod";
import { RegistroSchema, RegistroAdminSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { enviarCorreodeVerificacion } from "@/lib/nodemailer";
import { formatearNombre } from "@/lib/formatearNombre";
import { generarPassword } from '@/lib/generarPassword';
import { usuarioIdActual } from "@/lib/auth";
import { RolUsuario } from "@prisma/client";
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const registro = async (values: z.infer<typeof RegistroSchema>) => {
    const camposValidos = RegistroSchema.safeParse(values);

    if (!camposValidos.success) {
        return { error: "Campos Inválidos!" };
    }
    const {
        name,
        apellidoPat,
        apellidoMat,
        ci,
        sexo,
        celular,
        email,
        password,
        direccion,
    } = camposValidos.data;

    const formattedName = formatearNombre(name);
    const formattedApellidoPat = apellidoPat ? formatearNombre(apellidoPat) : null;
    const formattedApellidoMat = apellidoMat ? formatearNombre(apellidoMat) : null;
    const formattedDireccion = direccion ? direccion.trim() : null;

    const usuarioExistente = await getUserByEmail(email);
    if (usuarioExistente) {
        return { error: "El correo ya se encuentra Registrado!" };
    }

    const passwordEncriptado = await bcrypt.hash(password, 10);

    try {
        await db.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: formattedName,
                    apellidoPat: formattedApellidoPat,
                    apellidoMat: formattedApellidoMat,
                    ci: ci ? ci.replaceAll(" ", "") : null,
                    sexo: sexo ? sexo.replaceAll(" ", "") : null,
                    celular: celular ? celular.replaceAll(" ", "") : null,
                    direccion: formattedDireccion,
                    email,
                    password: passwordEncriptado
                },
            });

            await tx.user.update({
                where: { id: user.id },
                data: {
                    idUsuario: user.id
                }
            });

            return user;
        });
        const tokenVerificacion = await generateVerificationToken(email);

        await enviarCorreodeVerificacion(
            tokenVerificacion.email,
            tokenVerificacion.token
        )

        return { success: "Te enviamos un correo de confirmación a tu correo electrónico, para confirmar tu cuenta." };
    } catch (error) {
        console.log(error);
        return { error: "Error al registrar usuario!" };
    }

};

export const registrarUsuarioByAdmin = async (values: z.infer<typeof RegistroAdminSchema>) => {
    const validatedFields = RegistroAdminSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { name, apellidoPat, apellidoMat, ci, sexo, email, celular, direccion, rol } = validatedFields.data;

    try {
        const formattedName = formatearNombre(name);
        const formattedApellidoPat = apellidoPat ? formatearNombre(apellidoPat) : null;
        const formattedApellidoMat = apellidoMat ? formatearNombre(apellidoMat) : null;
        const formattedDireccion = direccion ? direccion.trim() : null;

        let usuarioExistente;
        if(email !== undefined){
            usuarioExistente = await getUserByEmail(email);
        }else{
            return {error: "El correo es requerido"}
        }

        if (usuarioExistente) {
            return { error: "El correo ya se encuentra Registrado!" };
        }

        const password = generarPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const idUActual = await usuarioIdActual();

        const user = await db.user.create({
            data: {
                name: formattedName,
                apellidoPat: formattedApellidoPat,
                apellidoMat: formattedApellidoMat,
                ci: ci ? ci.replaceAll(" ", "") : null,
                sexo: sexo ? sexo.replaceAll(" ", "") : null,
                celular: celular ? celular.replaceAll(" ", "") : null,
                direccion: formattedDireccion,
                email,
                password: hashedPassword,
                rol,
                idUsuario: idUActual,
            },
        });

        const tokenVerificacion = await generateVerificationToken(email);

        await enviarCorreodeVerificacion(tokenVerificacion.email, tokenVerificacion.token, password);

        return { success: "Usuario Registrado Correctamente!" };
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { error: "Ocurrió un error al registrar el usuario." };
    }
};

export const registrarUsuarioConImagen = async (formData: FormData) => {
    try {
        const archivo = formData.get("archivo") as File | null;
        const name = formData.get('name') as string;
        const apellidoPat = formData.get('apellidoPat') as string;
        const apellidoMat = formData.get('apellidoMat') as string | undefined;
        const ci = formData.get('ci') as string | undefined;
        const sexo = formData.get('sexo') as string | undefined;
        const email = formData.get('email') as string;
        const celular = formData.get('celular') as string | undefined;
        const direccion = formData.get('direccion') as string | undefined;
        const rol = formData.get('rol') as RolUsuario;

        const formattedName = formatearNombre(name);
        const formattedApellidoPat = apellidoPat ? formatearNombre(apellidoPat) : null;
        const formattedApellidoMat = apellidoMat ? formatearNombre(apellidoMat) : null;
        const formattedDireccion = direccion ? direccion.trim() : null;

        const usuarioExistente = await getUserByEmail(email);
        if (usuarioExistente) {
            return { error: "El correo ya se encuentra Registrado!" };
        }

        let rutaImagen: string | null = null;

        if (archivo) {
            const nombreUnico = `${uuidv4()}_${archivo.name}`;
            const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'usuarios', nombreUnico);
            await fs.ensureDir(path.dirname(rutadeAlmacenamiento));

            const buffer = Buffer.from(await archivo.arrayBuffer());
            await fs.writeFile(rutadeAlmacenamiento, buffer);
            rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/usuarios/${nombreUnico}`;
        }

        const password = generarPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const idUActual = await usuarioIdActual();

        const user = await db.user.create({
            data: {
                name: formattedName,
                apellidoPat: formattedApellidoPat,
                apellidoMat: formattedApellidoMat,
                ci: ci ? ci.replaceAll(" ", "") : null,
                sexo: sexo ? sexo.replaceAll(" ", "") : null,
                celular: celular ? celular.replaceAll(" ", "") : null,
                direccion: formattedDireccion,
                email,
                password: hashedPassword,
                rol,
                image: rutaImagen,
                idUsuario: idUActual,
            },
        });

        const tokenVerificacion = await generateVerificationToken(email);

        await enviarCorreodeVerificacion(tokenVerificacion.email, tokenVerificacion.token, password);

        return { success: "Usuario Registrado Correctamente!" };
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { error: "Ocurrió un error al registrar el usuario." };
    }
};