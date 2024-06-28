import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
	try {
		const dobleFactorToken = await db.tokenDobleFactor.findUnique({
			where: {
				token: token,
			},
		});
		return dobleFactorToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};

//TODO: INVESTIGAR LA DIFERENCIA DE FINDUNIQUE Y FINDFIRST
export const getTwoFactorTokenByEmail = async (email: string) => {
	try {
		const dobleFactorToken = await db.tokenDobleFactor.findFirst({
			where: {
				email: email,
			},
		});
		return dobleFactorToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};
