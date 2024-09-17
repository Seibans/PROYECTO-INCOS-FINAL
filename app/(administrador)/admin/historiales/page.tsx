import { DatePicker } from "./_components/datepicker";
import { HeaderHistoriales } from "./_components/HeaderHistoriales"
import { ListaHistoriales } from "./_components/ListaHistoriales";

export default function HistorialesPage() {
  
  return (
    <div className="w-full">
      <DatePicker/>
      <HeaderHistoriales />
      <ListaHistoriales />
    </div>
  )
}
