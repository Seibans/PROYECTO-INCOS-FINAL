import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { obtenerMascota } from '@/actions/mascotas';
import { Header } from './_components/Header';
import { InformacionUsuario } from './_components/InformacionUsuario';
import { FooterUsuario } from './_components/FooterUsuario';
import { getUserById } from '@/data/user';
//TODO: Revisar que es esto
// import { de } from 'date-fns/locale';


// Ten mucho cuidado porque cambiar aca debes tomar el parametro de la ruta
export default async function UsuarioIdPage({ params }: { params: { usuarioId: string } }) {
	//TODO: REDIRIGIR AL USUARIO SI NO EXISTE
	const usuario = await auth();
	if (!usuario || !usuario.user) {
		redirect("/login");
		return null;
	}

	const usuarioEditar = await getUserById(parseInt(params.usuarioId));

	if (!usuarioEditar) {
		redirect("/admin/usuarios");
		return null;
	}

	return (
		<div>
			<Header/>
			<InformacionUsuario usuario={usuarioEditar}/>
			<FooterUsuario usuarioId={usuarioEditar.id}/>
		</div>
	)
}
