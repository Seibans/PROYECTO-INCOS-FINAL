"use client"
import { deshabilitarMascota } from '@/actions/mascotas'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type FooterMascotaProps = {
	mascotaId: number
}

export const FooterMascota = (props: FooterMascotaProps) => {

	const { mascotaId } = props
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDeleteMascota = async () => {
		try {
			startTransition(() => {
				toast.promise(deshabilitarMascota(mascotaId), {
					loading: "Cargando...",
					success: (data) => {
						if (data.error) {
							throw new Error(data.error);
						} else {
							router.refresh();
							return `${data.success}`;
						}
					},
					error: (error) => error.message,
				});
			});
		} catch (error) {
			// toast({
			// 	title: "Algo Salio mal",
			// 	variant: "destructive"
			// })
		}
	}

	return (
		<div className='flex justify-end mt-5'>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive">
						<Trash className='w-4 h-4 mr-2' />
						Eliminar Mascota
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Esta Seguro de Eliminar la Mascota?</AlertDialogTitle>
						<AlertDialogDescription>
							{/* This action cannot be undone. This will permanently delete your
			  account and remove your data from our servers. */}
							Esta acción no se puede deshacer. Esto eliminará permanentemente la mascota pero conservará sus datos en nuestros servidores.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={onDeleteMascota}>Continuar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
