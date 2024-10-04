import { redirect } from 'next/navigation';
import { HeaderServicio } from './_components/HeaderServicio';
import { InformacionServicio } from './_components/InformacionServicio';
import { FooterServicio } from './_components/FooterServicio';
import { obtenerServicio } from '@/actions/servicios';

export default async function ServicioIdPage({ params }: { params: { servicioId: string } }) {

	const servicio: any = await obtenerServicio(parseInt(params.servicioId));

	if (!servicio) {
		redirect("/admin/servicios");
		return null;
	}

	return (
		<div>
			<HeaderServicio />
			<InformacionServicio servicio={servicio} />
			<FooterServicio servicioId={servicio.id} />
		</div>
	)
}
