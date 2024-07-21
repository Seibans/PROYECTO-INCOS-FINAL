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


const NavBar = () => {

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
			className="sticky top-0 z-50 flex w-full justify-center"
		>
			<div className='flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-16 rounded-b-3xl'>
				<div className="relative w-[300px]">
					<Input placeholder="Buscar..." className='rounded-lg' />
					<Search strokeWidth={1} className='absolute top-2 right-2' />
				</div>
				<div className='flex gap-x-4 items-center'>
					<div className="flex gap-x-2 items-center">
						<ToggleModo />
					</div>
					<BotonUsuario/>
					{/* <div className="block md:hidden"> */}
					<div className="block xl:hidden">
						<Sheet>
							<SheetTrigger className='flex items-center'>
								<Menu />
							</SheetTrigger>
							<SheetContent side={"right"}>
								<SideBar></SideBar>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default NavBar