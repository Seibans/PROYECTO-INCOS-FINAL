"use server";

import * as z from "zod";

import {ResetSchema} from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const camposValidos = ResetSchema.safeParse(values);

	if(!camposValidos.success){
		return {error: "Correo Inválido!     "};
	}

	const {email} = camposValidos.data;

	const usuarioExistente = await getUserByEmail(email);

	if(!usuarioExistente) {
		return {error: "Email no encontrado!"}
	}

	//TODO:Generar token y enviar el email
	return {success: "Correo de Reestablecimiento Enviado!"};
}