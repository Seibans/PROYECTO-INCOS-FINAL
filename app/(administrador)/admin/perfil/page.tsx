"use client";
import { HeaderFormAdmin } from "./_components/HeaderAdmin";
import { FormPerfilAdmin } from "./_components/FormPerfilAdmin"


export default function PerfilAdminPage() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center flex-col">
				<h2 className="text-2xl">Mi Perfil</h2>
				<FormPerfilAdmin />
			</div>
		</div>
	)
}