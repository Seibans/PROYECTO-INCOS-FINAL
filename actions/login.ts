"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas"; 

export const login: any = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Campos Inválidos!"};
    }

    return {success: "Credenciales Enviadas!"};
};