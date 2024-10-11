"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FormMascota } from "./FormMascota";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormMascotaGlobal } from "./FormMascotaGlobal";
import { usuariosMascota } from "@/actions/usuarios";

export const HeaderMascotas = () => {
	const [abrirModal, setabrirModal] = useState(false);
	const [usuarios, setUsuarios] = useState<any[]>([]);

	useEffect(() => {
		const loadUsuarios = async () => {
			const usuariosData = await usuariosMascota();
			setUsuarios(usuariosData);
		};
		loadUsuarios();
	}, []);

	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl">Lista de Mascotas</h2>
			<Dialog open={abrirModal} onOpenChange={setabrirModal}>
				<DialogTrigger asChild>
					<Button variant="outline" className="bg-gradient">Registrar Mascota</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							Registrar Mascota
						</DialogTitle>
						<DialogDescription>
							Registra y Edita tu Mascota
						</DialogDescription>
					</DialogHeader>
					<FormMascotaGlobal setabrirModal={setabrirModal} usuarios={usuarios} isDialog={true} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

