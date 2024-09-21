import ModernClientProfile from "../../../components/otros/modern-client-profile";
import { Navbar } from "../_components/navbar.component";
// "use client"
// import { motion } from 'framer-motion'

import { rolActual } from "@/lib/auth";
import { redirect } from 'next/navigation'
import { RolUsuario } from "@prisma/client";
import NavBar from '@/components/global/Navbar.component'
import { FooterNav } from "../../../components/otros/footerNav";
import ClientMotionWrapper from "./_components/ClientMotionWrapper";
import FooterDrawer from "../_components/footer-drawer";

export default async function LayoutCliente({ children }: { children: React.ReactElement }) {
	const rol = await rolActual();

	if (!rol) {
		redirect('/login')
	}

	if (rol === RolUsuario.Administrador) {
		redirect('/admin')
	}
	return (
		// <div className="bg-gradient-to-br from-teal-200 to-blue-500 min-h-screen rounded-t-2xl">
		// 	<div className="flex justify-center w-2/3">
		// 		<NavBar profileRoute="/cliente/perfil" />
		// 	</div>
		// 	<main className="container mx-auto p-4 pt-2 pb-24">
		// 		<ClientMotionWrapper>
		// 			{children}
		// 		</ClientMotionWrapper>
		// 	</main>
		// 	{/* <FooterNav /> */}
		// 	{/* <FooterDrawer /> */}
		// </div>

		<div className='flex'>
			<div className='w-screen'>
				<NavBar profileRoute="/cliente/perfil" />
				<div className="p-6 dark:bg-secondary">
					{children}
				</div>
			</div>
			{/* <FooterNav /> */}
			<FooterDrawer />
		</div>

	);
}