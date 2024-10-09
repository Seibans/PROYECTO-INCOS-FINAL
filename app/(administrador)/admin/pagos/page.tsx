import DownloadButtons from "./_components/app_components_DownloadPDFButton";
import { PaymentDashboard } from "./_components/Pagos.component";
import { Pagos2 } from "./_components/pagos2";

export default function PagosPage() {
  return (
    <div>
      {/* <Pagos2 /> */}
      <PaymentDashboard />
      <DownloadButtons userId={5} />
    </div>
  )
}
