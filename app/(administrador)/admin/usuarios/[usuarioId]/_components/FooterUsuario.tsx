"use client"
import { eliminarMascota } from '@/actions/mascotas'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type FooterUsuarioProps = {
	usuarioId: number
}

export const FooterUsuario = (props: FooterUsuarioProps) => {

	const {usuarioId} = props
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDeleteMascota = async () => {
		try {
			startTransition(() => {
				toast.promise(eliminarMascota(usuarioId), {
					loading: "Cargando...",
					success: (data) => {
						if (data.error) {
							throw new Error(data.error);
						} else {
							router.push("/admin/mascotas");
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
		<Button
			variant={"destructive"}
			onClick={onDeleteMascota}
			
		>
			<Trash className='w-4 h-4 mr-2'/>
			Borrar Usuario
		</Button>
	</div>
  )
}
