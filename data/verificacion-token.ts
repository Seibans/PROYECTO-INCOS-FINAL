import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (
	token: string
) => {
	try {
		const verificacionToken = await db.tokenVerificacion.findUnique({
			where: {
				token: token,
			},
		});
		return verificacionToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getVerificationTokenByEmail = async (
	email: string
) => {
	try {
		const verificacionToken = await db.tokenVerificacion.findFirst({
			where: {
				email: email,
			},
		});
		return verificacionToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};