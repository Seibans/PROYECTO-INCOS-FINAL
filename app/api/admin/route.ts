import { rolActual } from "@/lib/auth";
import { RolUsuario } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {

	const rol = await rolActual();
	if (rol === RolUsuario.Administrador) { 
		return new NextResponse(null, {status:200})
	}

	return new NextResponse(null, {status:403})
}