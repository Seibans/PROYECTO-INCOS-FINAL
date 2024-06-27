import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
	try{
		const tokenPasswordReset = await db.tokenReestablecimientoPassword.findUnique({
			where: {token}
		});

		return tokenPasswordReset;
	}catch{
		return null;
	}
}

export const getPasswordResetTokenByEmail = async (email: string) => {
	try{
		const tokenPasswordReset = await db.tokenReestablecimientoPassword.findFirst({
			where: {email}
		});

		return tokenPasswordReset;
	}catch{
		return null;
	}
}