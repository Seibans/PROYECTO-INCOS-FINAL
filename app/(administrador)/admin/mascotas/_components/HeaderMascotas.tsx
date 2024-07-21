"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PJJ6K17hsY6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { SelectForm } from "./FormMascota";

// <DialogContent className="sm:max-w-[625px]">
// </DialogContent>
export const HeaderMascotas = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl">Lista de Mascotas</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline">Registrar Mascota</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Mascota
						</DialogTitle>
						<DialogDescription>
							Registra y Edita tu Mascota
						</DialogDescription>
					</DialogHeader>
					<SelectForm/>
				</DialogContent>
			</Dialog>
		</div>
	)
}