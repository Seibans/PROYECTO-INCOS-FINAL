"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
// import { FormMascota } from "./FormMascota";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


// <DialogContent className="sm:max-w-[625px]">
// </DialogContent>
export const HeaderHistoriales = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl">Lista de Historiales</h2>
			{/* <Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline">Registrar Historial</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Historial
						</DialogTitle>
						<DialogDescription>
							Edita el Historial
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog> */}
		</div>
	)
}

