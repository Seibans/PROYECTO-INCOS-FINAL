import NavBar from '@/components/global/Navbar.component'
import { SideBar } from '@/components/global/Sidebar.component'
import React from 'react'

export default function LayoutDashboard({ children }: { children: React.ReactElement }) {
	return (
		// <div className='flex w-full h-full'>
		<div className='flex w-full'>
			<div className='w-full xl:ml-60'>
				<NavBar />
				{/* <div className="p-6 bg-[#fafbfc] dark:bg-secondary"> */}
				<div className="p-6 dark:bg-secondary">
					{children}
				</div>
			</div>
			<div className='hidden xl:block xl:fixed w-60 h-full'>
				<SideBar/>
			</div>
		</div>
	)
}
