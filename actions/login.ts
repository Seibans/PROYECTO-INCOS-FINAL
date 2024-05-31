"use server";
//Esto es un server action
import * as z from "zod";

import { AuthError} from "next-auth";
import { getUserByEmail } from '@/data/user';

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'El correo no Existe!' };
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
                default:
                    return { error: "Error de autenticación" };
            }
        }

        throw error;
    }
};