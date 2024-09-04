"use client"
import { deshabilitarUsuario } from '@/actions/usuarios'
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

type FooterUsuarioProps = {
	usuarioId: number
}

export const FooterUsuario = (props: FooterUsuarioProps) => {

	const { usuarioId } = props
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDeshabilitarUsuario = async () => {
		try {
			startTransition(() => {
				toast.promise(deshabilitarUsuario(usuarioId), {
					loading: "Cargando...",
					success: (data) => {
						if (data.error) {
							throw new Error(data.error);
						} else {
							router.refresh();
							// router.push("/admin/usuarios");
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
						Eliminar Usuario

					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Esta Seguro de Eliminar el Usuario?</AlertDialogTitle>
						<AlertDialogDescription>
							{/* This action cannot be undone. This will permanently delete your
			  account and remove your data from our servers. */}
							Esta acción no se puede deshacer. Esto eliminará permanentemente la cuenta pero conservará sus datos en nuestros servidores.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={onDeshabilitarUsuario}>Continuar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>

	)
}
