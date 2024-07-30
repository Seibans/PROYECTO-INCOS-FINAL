//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { obtenerMascotas } from "@/actions/mascotas";
import { Mascota, User } from "@prisma/client"
import { TablaUsuarios } from "@/components/admin/TablaUsuarios";
import { obtenerUsuarios } from "@/actions/usuarios";

export const ListaUsuarios = async () => {
  const usuarios: User[] = await obtenerUsuarios();
  return (
    <>
      <TablaUsuarios data={usuarios} />
    </>
  )
}