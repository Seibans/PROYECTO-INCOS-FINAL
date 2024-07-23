"use client";
import {
	BarChart4,
	Building,
	PanelsTopLeft,
	Settings,
	ShieldCheck,
	CircleHelpIcon,
	Calendar,
	Building2,
	Dog,
	Bone,
	ClipboardPlusIcon,
	Dna,
	HeartPulse,
	Syringe,
	HandCoins,
	Pill
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SideBarItem } from '@/components/global/SidebarItem.component';
import { Logo } from '@/components/global/Logo.component';
import { ScrollArea } from '@/components/ui/scroll-area';

const datosGeneralesSidebar = [
	{
		icon: PanelsTopLeft,
		label: 'Datos Generales',
		href: '/admin'
	},
	{
		icon: Calendar,
		label: 'Agenda',
		href: '/admin/agenda'
	},
	{
		icon: Dog,
		label: 'Mascotas',
		href: '/admin/mascotas'
	},
	{
		icon: ClipboardPlusIcon,
		label: 'Historiales',
		href: '/admin/historiales'
	},
	// {
	// 	icon: Building2,
	// 	label: 'Veterinarias',
	// 	href: '/admin/veterinarias'
	// },
	{
		icon: Pill,
		label: 'Medicamentos',
		href: '/admin/medicamentos'
	},
	{
		icon: HandCoins,
		label: 'Pagos',
		href: '/admin/pagos'
	},
	// {
	// 	icon: Bone,
	// 	label: 'Alimento',
	// 	href: '/alimento'
	// },
	// {
	// 	icon: Dna,
	// 	label: 'Resultados',
	// 	href: '/resultados'
	// },
	// {
	// 	icon: HeartPulse,
	// 	label: 'Estado',
	// 	href: '/estado'
	// },
	// {
	// 	icon: Syringe,
	// 	label: 'Vacunas',
	// 	href: '/vacunas'
	// }
]

const datosToolsSidebar = [
	{
		icon: CircleHelpIcon,
		label: 'Preguntas',
		href: '/admin/preguntas'
	},
	// {
	// 	icon: BarChart4,
	// 	label: 'Analiticas',
	// 	href: '/admin/analiticas'
	// }
]

const datosSoporteSidebar = [
	{
		icon: Settings,
		label: 'Configuracion',
		href: '/admin/configuracion'
	},
	{
		icon: ShieldCheck,
		label: 'Seguridad',
		href: '/admin/seguridad'
	}
]

// TODO: Corregir lo de la Key que al llegar al item es undefined
export const SideBar = () => {
	return (
		<div className="h-screen">
			<div className="h-dvh flex flex-col">
				<Logo />
				<ScrollArea className='flex flex-col h-full justify-between'>
					<div>
						<div className="p-2 md:p-4">
							<p className="text-slate-500 mb-2">General</p>
							{datosGeneralesSidebar.map((item, index) => (
								<SideBarItem key={item.label} item={item} />
							))}
						</div>
						<Separator />
						<div className="p-2 md:p-4">
							<p className="text-slate-500 mb-2">Soporte</p>
							{datosSoporteSidebar.map((item, index) => (
								<SideBarItem key={item.label} item={item} />
							))}
						</div>
						<Separator />
						<div className="p-2 md:p-4">
							<p className="text-slate-500 mb-2">Herramientas</p>
							{datosToolsSidebar.map((item, index) => (
								<SideBarItem key={item.label} item={item} />
							))}
						</div>
					</div>
					<div>
						<div className="text-center p-4">
							<Button variant={"outline"} className='w-full'>
								Ir a la Página Principal
							</Button>
						</div>
						<Separator />
						<footer className="mt-3 mb-4 p-3 text-center">
							2024. Todos los derechos reservados
						</footer>
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}