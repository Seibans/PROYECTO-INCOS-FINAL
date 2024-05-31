import { auth, signOut} from "@/auth";

const SettingsPage = async () => {

	const session = await auth();
	// session?.user.id; mejora el autocompletado 

	return (
		<div>
			{JSON.stringify(session)}
			<form action={async () => {
				// esto es exclusivamente del lado del servidor
				"use server";
				await signOut();
			}}>
				{/* boton de cerrar session de supermaven */}
				{/* <button type="submit" onClick={async () => {
					await auth.signOut();
				}}>
					Cerrar sesión
				</button> */}

				<button>
					Cerrar Sessión 
				</button>
			</form>
		</div>
	);
}

export default SettingsPage;