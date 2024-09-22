import SubirImagen from "@/components/global/SubirImagen.component";
import FormInputFile from "./_components/custom-image-upload-form";
import { HeaderMedicamentos } from "./_components/HeaderMedicamentos";
import { ListaMedicamentos } from "./_components/ListaMedicamentos";
import { MedicamentosComponent } from "./_components/medicamentos";
import SubirImagen2 from "@/components/global/SubirImagen2.component";

export default function MedicamentosPage() {
  return (
	<div className="w-full">
		{/* <SubirImagen />
		<SubirImagen2 /> */}
		<HeaderMedicamentos />
		<ListaMedicamentos />
		{/* <MedicamentosComponent /> */}
	</div>
  )
}
