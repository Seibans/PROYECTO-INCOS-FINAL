// import { CustomIcon } from "@/components/admin/CustomIcon.component"
// import { DistribuidoresComponent } from "@/components/admin/Distribuidores.component"
import { BarChart } from "lucide-react"

export const Distribuidores = () => {
  return (
	<div className="shadow-sm bg-background rounded-lg p-5">
		<div className="flex gap-x-2 items-center">
			{/* <CustomIcon icon={BarChart}/> */}
			<p className="text-xl">Distribuidores</p>
		</div>
		<div className="">
			{/* <DistribuidoresComponent/> */}
		</div>
	</div>
  )
}