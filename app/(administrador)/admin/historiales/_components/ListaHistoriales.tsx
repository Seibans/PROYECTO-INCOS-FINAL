//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
// actions/historiales.ts

import { redirect } from "next/navigation";
import { TablaHistoriales } from "@/components/admin/TablaHistoriales.component";
import { obtenerTodosHistorialesConMascotas } from "@/actions/historiales";
import { HistorialMedicoVistaT } from "@/types";

export const ListaHistoriales = async () => {
  const historialesA = await obtenerTodosHistorialesConMascotas();

  if ("error" in historialesA) {
    console.error(historialesA.error);
    return <p>Ocurrió un error al obtener los historiales médicos.</p>;
  }

  const historiales: HistorialMedicoVistaT[] = historialesA.historiales;

  return (
    <>
      <TablaHistoriales data={historiales} />
    </>
  );
};
