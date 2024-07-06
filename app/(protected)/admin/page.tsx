"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PuertaRol } from "@/components/auth/puerta-rol.component";
import { FormSuccess } from "@/components/form-success.component";
import { RolUsuario } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = async () => {

	const enAcciondeServidor = () => {
		admin()
			.then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
				}
			});
	}

	const enRutaApiClick = () => {
		fetch("/api/admin")
			.then((res) => {
				if (res.ok) {
					toast.success("Se ha activado el rol de administrador");
				} else {
					toast.error("No se ha podido activar el rol de administrador");
				}
			})
	}

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					Administrador
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<PuertaRol rolPermitido={RolUsuario.ADMINISTRADOR}>
					<FormSuccess message="Bienvenido como administrador!" />
				</PuertaRol>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">
						Solo Ruta de Administrador (API)
					</p>
					<Button onClick={enRutaApiClick}>
						Click para Probar
					</Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">
						Solo Accion de Servidor
					</p>
					<Button onClick={enAcciondeServidor}>
						Click para Probar
					</Button>
				</div>

			</CardContent>
		</Card>
	)
}

export default AdminPage;