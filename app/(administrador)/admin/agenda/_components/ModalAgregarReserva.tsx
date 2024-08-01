"use client";
import { User } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"


type ModalAgregarReservaProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setguardarNuevaReserva: Dispatch<SetStateAction<boolean>>;
	usuarios: User[];
	setnuevoEvento: Dispatch<
		SetStateAction<{
			titulo: string
			usuarioSeleccionado: { name: string, id: string };
		}>
	>;
};

export default function ModalAgregarReserva(props: ModalAgregarReservaProps) {

	const {open, usuarios, setnuevoEvento, setguardarNuevaReserva, setOpen } = props;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Aregar Nueva Reserva</DialogTitle>
				</DialogHeader>
				<p>Holi</p>
			</DialogContent>
		</Dialog>
	)
}
