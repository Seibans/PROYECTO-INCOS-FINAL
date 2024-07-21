import { obtenerMascotas } from "@/actions/mascotas";
import { HeaderMascotas } from "./_components/HeaderMascotas"
import { ListaMascotas } from "./_components/ListaMascotas";

export default async function MascotasPage() {
  return (
    <div className="w-full">
      <HeaderMascotas />
      <ListaMascotas />
    </div>
  )
}
