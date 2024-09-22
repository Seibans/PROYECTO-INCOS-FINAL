"use server";

import * as z from "zod";

import {ResetSchema} from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
// import { enviarCorreodeReestablecimientodePassword } from "@/lib/mail";
import { enviarCorreodeReestablecimientodePassword } from "@/lib/nodemailer";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const camposValidos = ResetSchema.safeParse(values);

	if(!camposValidos.success){
		return {error: "Correo Inválido!"};
	}

	const {email} = camposValidos.data;

	const usuarioExistente = await getUserByEmail(email);

	if(!usuarioExistente) {
		return {error: "Email no encontrado!"}
	}

	const tokenResetPassword = await generatePasswordResetToken(email);

	console.log(tokenResetPassword);
	await enviarCorreodeReestablecimientodePassword(
		tokenResetPassword.email,
		tokenResetPassword.token,
	)

	return {success: "Correo de Reestablecimiento Enviado!"};
}