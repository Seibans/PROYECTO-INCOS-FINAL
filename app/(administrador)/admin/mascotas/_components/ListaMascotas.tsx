//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TablaMascotas } from "@/components/admin/TablaMascotas.component";
import { obtenerMascotas } from "@/actions/mascotas";
import { Mascota } from "@prisma/client"

export const ListaMascotas = async () => {
  const mascotas: Mascota[] = await obtenerMascotas();
  return (
    <>
      {/* <TablaMascotas data={mascotas} /> */}
    </>
  )
}