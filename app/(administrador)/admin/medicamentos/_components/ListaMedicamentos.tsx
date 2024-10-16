//TODO: Redireccion del usuario a login por si no encuentra uno, cambiar la logica a Admin
//Video dashboard 3:21
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Medicamento } from "@prisma/client"
import { obtenerMedicamentos } from "@/actions/medicamentos";
import { TablaMedicamentos } from "@/components/admin/TablaMedicamentos.component";
import { MedicamentoT } from "@/types";
export const ListaMedicamentos = async () => {
  const medicamentos: MedicamentoT[] = await obtenerMedicamentos();
  return (
    <>
      <TablaMedicamentos data={medicamentos} />
    </>
  )
}