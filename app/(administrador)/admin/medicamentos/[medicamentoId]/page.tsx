import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { HeaderMedicamentos } from './_components/HeaderMedicamentos';
import { InformacionMedicamento } from './_components/InformacionMedicamento';
import { FooterMedicamento } from './_components/FooterMedicamento';
import { obtenerMedicamento } from '@/actions/medicamentos';
//TODO: Revisar que es esto
// import { de } from 'date-fns/locale';

// Ten mucho cuidado porque cambiar aca debes tomar el parametro de la ruta
export default async function MedicamentoIdPage({ params }: { params: { medicamentoId: string } }) {
	//TODO: REDIRIGIR AL USUARIO SI NO EXISTE
	const usuario = await auth();
	if (!usuario || !usuario.user) {
		redirect("/login");
		return null;
	}

	const medicamento: any = await obtenerMedicamento(parseInt(params.medicamentoId));

	if (!medicamento) {
		redirect("/admin/medicamentos");
		return null;
	}

	return (
		<div>
			<HeaderMedicamentos/>
			<InformacionMedicamento medicamento={medicamento}/>
			<FooterMedicamento medicamentoId={medicamento.id}/>
		</div>
	)
}
