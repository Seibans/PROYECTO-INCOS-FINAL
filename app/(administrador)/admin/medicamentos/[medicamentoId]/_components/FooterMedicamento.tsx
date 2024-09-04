"use client"
import { eliminarMedicamento } from '@/actions/medicamentos'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type FooterMedicamentoProps = {
	medicamentoId: number
}

export const FooterMedicamento = (props: FooterMedicamentoProps) => {

	const {medicamentoId} = props
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDeleteMedicamento = async () => {
		try {
			startTransition(() => {
				toast.promise(eliminarMedicamento(medicamentoId), {
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
			onClick={onDeleteMedicamento}
			
		>
			<Trash className='w-4 h-4 mr-2'/>
			Borrar Medicamento
		</Button>
	</div>
  )
}
