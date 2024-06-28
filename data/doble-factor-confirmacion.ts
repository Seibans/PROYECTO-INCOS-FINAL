import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: number) => {
	try {
		const dobleFactorConfirmacion = await db.confirmacionDobleFactor.findUnique({
			where: {
				usuarioId: userId,
			},
		});
		return dobleFactorConfirmacion;
	} catch (error) {
		console.log(error);
		return null;
	}
};
