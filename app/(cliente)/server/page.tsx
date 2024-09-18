import { InfoUsuario } from "@/components/usuario-info.component";

// Puedes usar el hook de rol o el lib pero sabiendo que tipo de componente es si server o client
import { usuarioActual } from "@/lib/auth";

const ServerPage = async () => {
	const usuario = await usuarioActual();

	return (
		<div>
			<InfoUsuario
				label="💻 Componente de Servidor"
				usuario={usuario}
			/>
		</div>
	)
}

export default ServerPage;