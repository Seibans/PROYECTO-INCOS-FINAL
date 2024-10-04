"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormServicioGlobal } from "./FormServicioGlobal";

export const HeaderServicios = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex flex-col sm:flex-row justify-between items-center">
			<h2 className="text-2xl">Lista de Servicios</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline" className="bg-gradient">Registrar Servicio</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Servicio
						</DialogTitle>
						<DialogDescription>
							Registra y Edita tu Servicio
						</DialogDescription>
					</DialogHeader>
					<FormServicioGlobal setabrirModal={setabrirModal} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

