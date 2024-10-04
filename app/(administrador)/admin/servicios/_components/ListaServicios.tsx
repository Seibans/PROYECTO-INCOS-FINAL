//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { obtenerServicios } from "@/actions/servicios";
import { TablaServicios } from "@/components/admin/TablaServicios.component";
import { ServicioT } from "@/types";
export const ListaServicios = async () => {
  const servicios: ServicioT[] = await obtenerServicios();
  return (
    <>
      <TablaServicios data={servicios} />
    </>
  )
}