import { HeaderMedicamentos } from "./_components/HeaderMedicamentos";
import { ListaMedicamentos } from "./_components/ListaMedicamentos";
import { MedicamentosComponent } from "./_components/medicamentos";

export default function MedicamentosPage() {
  return (
	<div className="w-full">
		<HeaderMedicamentos />
		<ListaMedicamentos />
		<MedicamentosComponent />
	</div>
  )
}
