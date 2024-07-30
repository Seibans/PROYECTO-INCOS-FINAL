"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { FormMedicamento } from "./FormMedicamento";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


// <DialogContent className="sm:max-w-[625px]">
// </DialogContent>
export const HeaderMedicamentos = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl">Lista de Medicamentos</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline">Registrar Medicamento</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Medicamento
						</DialogTitle>
						<DialogDescription>
							Registra y Edita tu Medicamento
						</DialogDescription>
					</DialogHeader>
					<FormMedicamento setabrirModal={setabrirModal} />
				</DialogContent>
			</Dialog>

		</div>
	)
}

