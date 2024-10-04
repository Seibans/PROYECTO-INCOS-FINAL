"use client"
import { deshabilitarServicio } from '@/actions/servicios'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type FooterServicioProps = {
	servicioId: number
}

export const FooterServicio = (props: FooterServicioProps) => {
	const { servicioId } = props;
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDeshabilitarServicio = async () => {
		try {
			startTransition(() => {
				toast.promise(deshabilitarServicio(servicioId), {
					loading: "Cargando...",
					success: (data) => {
						if (data.error) {
							throw new Error(data.error);
						} else {
							router.push("/admin/servicios");
							return `${data.success}`;
						}
					},
					error: (error) => error.message,
				});
			});
		} catch (error) {
			// Puedes manejar errores adicionales aquí si es necesario
		}
	}

	return (
		<div className='flex justify-end mt-5'>
			<Button
				variant={"destructive"}
				onClick={onDeshabilitarServicio}
				disabled={isPending}
			>
				<Trash className='w-4 h-4 mr-2'/>
				Deshabilitar Servicio
			</Button>
		</div>
	)
}
