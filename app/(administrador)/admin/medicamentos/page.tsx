import FormInputFile from "./_components/custom-image-upload-form";
import { HeaderMedicamentos } from "./_components/HeaderMedicamentos";
import { ListaMedicamentos } from "./_components/ListaMedicamentos";
import { FormMedicamento } from "./_components/FormMedicamento";
import { FormMedicamentoGlobal } from "./_components/FormMedicamentoGlobal";
import ImageUploader from "./_components/ImageUploader";
import CurrencyForm from "./_components/InputBs";

export default function MedicamentosPage() {
  return (
	<div className="w-full">
		<FormInputFile />
		<FormMedicamento/>
		<FormMedicamentoGlobal/>
		<CurrencyForm/>
		{/* <ImageUploader onImageChange={(file) => console.log(file)} /> */}
		<HeaderMedicamentos />
		<ListaMedicamentos />
	</div>
  )
}
