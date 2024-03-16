"use client";
//Detalle por defecto lo importa de router pero tu usa el de navigation

import { useRouter } from "next/navigation";

// TODO: FORMA DE IMPLEMENTAR UN COMPONENTE MODAL
interface LoginButtonProps {
	children: React.ReactNode;

	// Esta Propiedad es opcional y se coloco de forma manual investigar las propos de un componente
	mode?:"modal" | "redirect",
	asChild?: boolean;
}

export function LoginButton({
	children,
	mode = "redirect",
	asChild
}: LoginButtonProps) {
	const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    }

    if (mode==="modal"){
        return (
            <span>
                TODO: Implementar modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}       
        </span>
    )
}
