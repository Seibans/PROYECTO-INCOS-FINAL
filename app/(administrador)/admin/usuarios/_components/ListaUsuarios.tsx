//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TablaUsuarios } from "@/components/admin/TablaUsuarios";
import { obtenerUsuarios } from "@/actions/usuarios";
import { UsuarioT } from "@/types";

export const ListaUsuarios = async () => {
  const usuarios: UsuarioT[] = await obtenerUsuarios();
  return (
    <>
      {/* <TablaUsuarios data={usuarios} /> */}
    </>
  )
}