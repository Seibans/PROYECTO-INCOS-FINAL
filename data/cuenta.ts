import { db } from "@/lib/db";

export const getCuentaById = async (usuarioId: number) => {
    try {
		
		const cuenta = await db.account.findFirst({
			where: {
				userId: usuarioId
			}
		});
		return cuenta;
	} catch (error) {
		return null;
	}
}