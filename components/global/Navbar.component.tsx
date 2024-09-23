// import React from 'react'
"use client";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SideBar } from '@/components/global/Sidebar.component'
import { ToggleModo } from '@/components/toggle.tema'
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { BotonUsuario } from '../auth/usuario-boton.component';

import { useUsuarioActual } from '@/hooks/use-usuario-actual';
import { RolUsuario } from '@prisma/client';
import { cn } from "@/lib/utils";


interface NavBarProps {
	profileRoute: string; // Recibe la ruta como prop
}

const NavBar: React.FC<NavBarProps> = ({ profileRoute }) => {
	const usuarioActual = useUsuarioActual(); // Usa el hook para obtener el usuario
	const [isHidden, setIsHidden] = useState(false);
	const { scrollY } = useScroll();
	const lastYRef = useRef(0);

	useMotionValueEvent(scrollY, "change", (y) => {
		const difference = y - lastYRef.current;
		if (Math.abs(difference) > 50) {
			setIsHidden(difference > 0);

			lastYRef.current = y;
		}
	});

	// Determina si el div debe ser ocultado
	const esAdmin = usuarioActual?.rol === RolUsuario.Administrador; // Ajusta esto según tu estructura

	return (
		<motion.div
			animate={isHidden ? "hidden" : "visible"}
			whileHover="visible"
			onFocusCapture={() => setIsHidden(false)}
			variants={{
				hidden: {
					y: "-90%",
				},
				visible: {
					y: "0%",
				},
			}}
			transition={{ duration: 0.2 }}
			className="sticky top-0 z-50 flex justify-center bg-transparent"
		>
			<div className={cn('flex items-center px-2 gap-x-4 md:px-6 justify-end bg-background border-b h-16 rounded-b-3xl', {
				"w-11/12 md:w-11/12": esAdmin,
				"w-11/12 md:w-9/12": !esAdmin
			})}>
				{/* <div className="relative w-[300px]">
					<Input placeholder="Buscar..." className='rounded-lg' />
					<Search strokeWidth={1} className='absolute top-2 right-2' />
				</div> */}
				<div className='flex gap-x-4 items-center'>
					<div className="flex gap-x-2 items-center">
						<ToggleModo />
					</div>
					<BotonUsuario profileRoute={profileRoute} />
					{esAdmin && (
						<div className="block xl:hidden">
							<Sheet>
								<SheetTrigger className='flex items-center'>
									<Menu />
								</SheetTrigger>
								<SheetContent side={"right"}>
									<SideBar />
								</SheetContent>
							</Sheet>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default NavBar