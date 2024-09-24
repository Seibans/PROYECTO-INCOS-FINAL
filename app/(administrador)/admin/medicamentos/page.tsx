import { HeaderMedicamentos } from "./_components/HeaderMedicamentos";
import { ListaMedicamentos } from "./_components/ListaMedicamentos";
export default function MedicamentosPage() {
  return (
	<div className="w-full">
		<HeaderMedicamentos />
		<ListaMedicamentos />
	</div>
  )
}
