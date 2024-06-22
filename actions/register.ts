"use server";
//Esto es un server action
import * as z from "zod";
import { RegisterSchema } from "@/schemas"; 
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import { enviarCorreodeVerificacion } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Campos Inválidos!"};
    }

    const { email, password, name } = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {error: "El usuario ya existe!"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    //TODO: enviar correo de confirmación


    await enviarCorreodeVerificacion(
        verificationToken.email, 
        verificationToken.token
    );

    // return {success: "Usuario registrado correctamente!"};
    return {success: "Confirmación de correo enviada!"}; 
};