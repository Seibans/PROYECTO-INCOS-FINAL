"use server";
import * as z from "zod";
import { RegistroSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
// import { enviarCorreodeVerificacion } from "@/lib/mail";
import { enviarCorreodeVerificacion } from "@/lib/nodemailer";
import { formatearNombre } from "@/lib/formatearNombre";

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