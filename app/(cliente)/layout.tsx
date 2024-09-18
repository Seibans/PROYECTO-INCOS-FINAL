import ModernClientProfile from "./_components/modern-client-profile";
import { Navbar } from "./_components/navbar.component";

import { rolActual } from "@/lib/auth";
import { redirect } from 'next/navigation'
import { RolUsuario } from "@prisma/client";

interface LayoutProtegidoProps {
	children: React.ReactNode;
}

const LayoutProtegido = async ({ children }: LayoutProtegidoProps) => {
	const rol = await rolActual();

	if (!rol) {
		redirect('/login')
	}

	if (rol === RolUsuario.Administrador) {
		redirect('/admin')
	}
	return (
		<div className='flex w-full'>
			<div className='w-full'>
				{/* <Navbar /> */}
				{/* <div className="p-6 dark:bg-secondary">
					{children}
				</div> */}
				<ModernClientProfile />
			</div>
		</div>
	);
}

export default LayoutProtegido;