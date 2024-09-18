"use client";

import { InfoUsuario } from "@/components/usuario-info.component";

// Puedes usar el hook de rol o el lib pero sabiendo que tipo de componente es si server o client
import { useUsuarioActual } from "@/hooks/use-usuario-actual";

const ClientPage = () => {
	const usuario = useUsuarioActual();
	return (
		<div>
			<InfoUsuario
				label="💻 Componente de Cliente"
				usuario={usuario}
			/>
		</div>
	)
}

export default ClientPage;