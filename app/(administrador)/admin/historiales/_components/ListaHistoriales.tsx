//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
// actions/historiales.ts
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SubirImagen from "@/components/admin/SubirImagen.component";
import SubirImagen2 from "@/components/admin/SubirImagen2.component";
import { obtenerMascotas } from "@/actions/mascotas";
import { Mascota } from "@prisma/client";
import { TablaHistoriales } from "@/components/admin/TablaHistoriales.component";
import { obtenerTodosHistorialesConMascotas } from "@/actions/historiales";
import { HistorialMedicoT } from "@/types";

export const ListaHistoriales = async () => {
  // Llama a la función y maneja la respuesta
  const response = await obtenerTodosHistorialesConMascotas();

  // Manejo de error
  if ('error' in response) {
    console.error(response.error);
    // Redirigir o mostrar un mensaje de error según tu lógica de negocio
    // Ejemplo: redirigir al login si no hay historiales
    redirect("/login");
    return null; // Asegúrate de que haya un retorno para evitar errores
  }

  // Si no hay error, extrae los historiales
  const historiales: HistorialMedicoT[] = response.historiales;

  console.log(historiales);

  return (
    <>
      {/* Renderiza el componente TablaHistoriales pasando los historiales */}
      <TablaHistoriales data={historiales} />
    </>
  );
}
