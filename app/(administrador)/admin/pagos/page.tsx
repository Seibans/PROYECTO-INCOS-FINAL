import DownloadButtons from "./_components/botonDescargaPdfExcel";
import { PagosDashboard } from "./_components/PagosDashboard";

export default function PagosPage() {
  return (
    <div>
      <PagosDashboard />
      <DownloadButtons userId={5} />
    </div>
  )
}
