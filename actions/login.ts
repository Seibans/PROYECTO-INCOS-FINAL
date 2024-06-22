"use server";
//Esto es un server action
import * as z from "zod";

import { AuthError} from "next-auth";
import { getUserByEmail } from '@/data/user';
import { enviarCorreodeVerificacion } from '@/lib/mail';

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { email, password } = validatedFields.data;

    //desde poner el token de verificacion
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'El correo no Existe!' };
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await enviarCorreodeVerificacion(
            verificationToken.email, 
            verificationToken.token
        );


        return { success: "Confirmación de Correo Enviada"};
    }

    try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
        // return { success: "Login Correcto" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email o contraseña incorrectos" };
                case "OAuthAccountNotLinked":
                    return { error: "No se ha conectado el perfil de GitHub" };
                // case "AccountNotFound":
                //     return { error: "El correo no existe" };
                // case "CredentialsExpired":
                //     return { error: "La cuenta ha expirado" };
                // case "CredentialsError":
                //     return { error: "Error de autenticación" };
                default:
                    return { error: "Error de autenticación" };
            }
        }

        throw error;
    }
};