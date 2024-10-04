"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { FormUsuario } from "./FormUsuario";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const HeaderUsuarios = () => {
	const [abrirModal, setabrirModal] = useState(false);
	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl">Lista de Usuarios Registrados</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline" className="bg-gradient">Registrar Usuario</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Usuario
						</DialogTitle>
						<DialogDescription>
							Registra un Nuevo Usuario
						</DialogDescription>
					</DialogHeader>
					<FormUsuario setabrirModal={setabrirModal} />
				</DialogContent>
			</Dialog>

		</div>
	)
}

