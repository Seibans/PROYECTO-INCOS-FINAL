import NavBar from '@/components/global/Navbar.component'
import { SideBar } from '@/components/global/Sidebar.component'
import React from 'react'
import { rolActual } from "@/lib/auth";
import { redirect } from 'next/navigation'
import { RolUsuario } from "@prisma/client";

export default async function LayoutDashboard({ children }: { children: React.ReactElement }) {
	const rol = await rolActual();

	if (!rol) {
		redirect('/login')
	}

	if (rol === RolUsuario.Usuario) {
		redirect('/cliente')
	}

	return (
		// // <div className='flex w-full h-full'>
		// <div className='flex w-full'>
		// 	<div className='w-full xl:ml-60'>
		// 		<NavBar profileRoute="/admin/perfil" />
		// 		{/* <div className="p-6 bg-[#fafbfc] dark:bg-secondary"> */}
		// 		<div className="p-6 dark:bg-secondary">
		// 			{children}
		// 		</div>
		// 	</div>
		// 	<div className='hidden xl:block xl:fixed w-60 h-full'>
		// 		<SideBar />
		// 	</div>
		// </div>
		<div className='flex bg-secondary'>
			<div className='hidden xl:block xl:w-1.8/12 h-screen sticky top-0'>
				<SideBar />
			</div>
			<div className='w-screen xl:w-10.2/12 bg-secondary'>
				<NavBar profileRoute="/admin/perfil" />
				{/* <div className="p-6 bg-[#fafbfc] dark:bg-secondary"> */}
				<div className="p-6 dark:bg-secondary">
					{children}
				</div>
			</div>
		</div>
	)
}