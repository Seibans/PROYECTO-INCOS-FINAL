// import { CustomIcon } from '@/components/admin/CustomIcon.component'
// import { TotalUsuariosComponent } from '@/components/admin/TotalUsuarios.component'
import { Percent } from 'lucide-react'
import React from 'react'

export const TotalUsuarios = () => {
	return (
		// TODO: Falla el md:w-96
		<div className='w-full p-5 mb-4 transition rounded-lg shadow-sm lg:mb-0 bg-background xl:w-96 hover:shadow-lg'>
			<div className="flex items-center mb-4 gap-x-2">
				{/* <CustomIcon icon={Percent} /> */}
				<p className="text-xl">Total Usuarios</p>
			</div>
			<div className="w-full h-full p-5">
				{/* <TotalUsuariosComponent /> */}
			</div>
		</div>
	)
}
