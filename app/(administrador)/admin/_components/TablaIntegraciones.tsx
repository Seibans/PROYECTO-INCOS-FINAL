// import { CustomIcon } from '@/components/admin/CustomIcon.component'
// import { TablaIntegracionesComponent } from "@/components/admin/TablaIntegraciones.component"
import { List } from 'lucide-react'

export const TablaIntegraciones = () => {
  return (
	<div className='shadow-sm bg-background rounded-lg p-5 flex-1'>
		<div className="flex gap-x-2 items-center">
			{/* <CustomIcon icon={List}/> */}
			<p className='text-xl'>Lista de Integraciones</p>
		</div>
		{/* <TablaIntegracionesComponent/> */}
	</div>
  )
}
