import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { obtenerMascota } from '@/actions/mascotas';
import { Header } from './_components/Header';
import { InformacionMascota } from './_components/InformacionMascota';
import { FooterMascota } from './_components/FooterMascota';
//TODO: Revisar que es esto
// import { de } from 'date-fns/locale';


// Ten mucho cuidado porque cambiar aca debes tomar el parametro de la ruta
export default async function MascotaIdPage({ params }: { params: { mascotaId: string } }) {
	//TODO: REDIRIGIR AL USUARIO SI NO EXISTE
	const usuario = await auth();
	if (!usuario || !usuario.user) {
		redirect("/login");
		return null;
	}

	const mascota = await obtenerMascota(parseInt(params.mascotaId));

	if (!mascota) {
		redirect("/admin/mascotas");
		return null;
	}

	return (
		<div>
			<Header/>
			<InformacionMascota mascota={mascota}/>
			<FooterMascota mascotaId={mascota.id}/>
		</div>
	)
}
