// TODO: ESTE COMPONENTE SE VA A CONVERTIR EN CLIENTE O SERVIDOR DEPENDIENDO DEL PADRE
//minuto 6:18

import { UsuarioExtendido } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "@/components/ui/badge";

interface InformacionUsuarioProps {
	usuario?: UsuarioExtendido;
	label: string;
};

export const InfoUsuario = ({
	usuario, label,
}: InformacionUsuarioProps) => {
	return (
		<Card className="w-[600px] shadow-sm">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					{label}
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">
						ID
					</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md ">
						{usuario?.id}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">
						Nombre
					</p>
					<p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md ">
						{usuario?.name}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">
						Correo Electrónico
					</p>
					<p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md ">
						{usuario?.email}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">
						Rol
					</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md ">
						{usuario?.rol}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">
						Doble Factor de Autenticación
					</p>
					{/* esto del success se agrego manualmente */}
					<Badge variant={usuario?.authDobleFactor ? "success" : "destructive"}>
						{usuario?.authDobleFactor ? "Activado" : "Desactivado"}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}

