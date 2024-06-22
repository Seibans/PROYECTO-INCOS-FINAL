import { getVerificationTokenByEmail } from "@/data/verificacion-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30 * 2)); //el token tendra un tiempo de vida de 

	const existingToken = await getVerificationTokenByEmail(email);
	
	if (existingToken) {
		await db.tokenVerificacion.delete({
			where: {
				id: existingToken.id,
			},
		});
	}
	const verificationToken = await db.tokenVerificacion.create({
		data: {
			token,
			email,
			expires,
		},
	});
	return verificationToken;
};
