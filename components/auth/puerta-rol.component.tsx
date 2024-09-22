"use client"

import { useRolActual } from "@/hooks/use-rol-actual";
import { RolUsuario } from "@prisma/client";
import { FormError } from "../form-error.component";

interface PuertaRolProps {
	children: React.ReactNode;
	rolPermitido: RolUsuario;
};

export const PuertaRol = ({ children, rolPermitido }: PuertaRolProps) => {
	const rol = useRolActual();
	if (rol !== rolPermitido) {
		<FormError message="No tienes permisos para ver este contenido!" />;
	}
	return (
		<>
			{children}
		</>
	);
};
