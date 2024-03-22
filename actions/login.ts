"use server";
//Esto es un server action
import * as z from "zod";
import { LoginSchema } from "@/schemas"; 

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Campos Inválidos!"};
    }

    return {success: "Credenciales Enviadas!"};
};