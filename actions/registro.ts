"use server";
//Esto es un server action
import * as z from "zod";
import { RegistroSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
// import { enviarCorreodeVerificacion } from "@/lib/mail";
import { enviarCorreodeVerificacion } from "@/lib/nodemailer";
import { formatName } from "@/lib/formatearNombre";
import { formatInTimeZone } from 'date-fns-tz';
import { enGB } from 'date-fns/locale/en-GB'
import { sendMail } from "@/lib/nodemailer";

export const registro = async (values: z.infer<typeof RegistroSchema>) => {
    const validatedFields = RegistroSchema.safeParse(values);

    if (!validatedFields.success) {
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
    } = validatedFields.data;

    // Normalizar nombres
    const formattedName = formatName(name);
    const formattedApellidoPat = apellidoPat ? formatName(apellidoPat) : null;
    const formattedApellidoMat = apellidoMat ? formatName(apellidoMat) : null;
    const formattedDireccion = direccion ? direccion.trim() : null;


    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "El usuario ya existe!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // console.log(new Date());
        // console.log(formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss'));
        // console.log(formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss zzz', { locale: enGB }));
        // const fecha = formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss');


        await db.$transaction(async (tx) => {
            // Crear el nuevo usuario
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
                    password: hashedPassword
                },
            });

            // Actualizar el mismo usuario con el campo idUsuario
            await tx.user.update({
                where: { id: user.id },
                data: {
                    idUsuario: user.id
                }
            });

            return user;
        });

        // await db.user.create({
        //     data: {
        //         name: formattedName,
        //         apellidoPat: formattedApellidoPat,
        //         apellidoMat: formattedApellidoMat,
        //         ci: ci ? ci.replaceAll(" ", "") : null,
        //         sexo: sexo ? sexo.replaceAll(" ", "") : null,
        //         celular: celular ? celular.replaceAll(" ", "") : null,
        //         direccion: formattedDireccion,
        //         email,
        //         password: hashedPassword,
        //     },
        // });   
        const verificationToken = await generateVerificationToken(email);

        await enviarCorreodeVerificacion(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Te enviamos un correo de confirmación a tu correo electrónico, para confirmar tu cuenta." };
        // return {success: "Confirmación de correo enviada!"}; 
    } catch (error) {
        console.log(error);
        return { error: "Error al registrar usuario!" };
    }

};