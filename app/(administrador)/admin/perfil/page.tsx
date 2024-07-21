"use client";
import { HeaderFormAdmin } from "./_components/HeaderAdmin";
import { FormPerfilAdmin } from "./_components/FormPerfilAdmin"
import { useUsuarioActual } from "@/hooks/use-usuario-actual"


export default function PerfilAdminPage() {
  const usuario = useUsuarioActual();
  console.log(useUsuarioActual())
  console.log(usuario)

  return (
	<div className="w-full">
    <div className="flex justify-between items-center flex-col">
			<h2 className="text-2xl">Mi Perfil</h2>
			<FormPerfilAdmin />
      {usuario?.name || ""}
		</div>
  </div>
  )
}