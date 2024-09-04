//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SubirImagen from "@/components/admin/SubirImagen.component";
import SubirImagen2 from "@/components/admin/SubirImagen2.component";
import { TablaMascotas } from "@/components/admin/TablaMascotas.component";
import { obtenerMascotas } from "@/actions/mascotas";
import { Mascota } from "@prisma/client"

export const ListaMascotas = async () => {
  const mascotas: Mascota[] = await obtenerMascotas();
  console.log(mascotas)
  return (
    <>
      <TablaMascotas data={mascotas} />
      <div className="grid grid-cols-2 bg-background">
        <div className="flex justify-center items-center">
          <SubirImagen />
        </div>
        <div className="flex justify-center items-center">
          <SubirImagen2 />
        </div>
      </div>
    </>
  )
}