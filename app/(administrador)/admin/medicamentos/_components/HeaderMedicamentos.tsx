"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormMedicamentoGlobal } from "./FormMedicamentoGlobal";

export const HeaderMedicamentos = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex flex-col sm:flex-row justify-between items-center">
			<h2 className="text-2xl">Lista de Medicamentos</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline" className="bg-gradient">Registrar Medicamento</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Medicamento
						</DialogTitle>
						<DialogDescription>
							Registra y Edita tu Medicamento
						</DialogDescription>
					</DialogHeader>
					<FormMedicamentoGlobal setabrirModal={setabrirModal} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

