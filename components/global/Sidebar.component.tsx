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
	Pill,
	User2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SideBarItem } from '@/components/global/SidebarItem.component';
import { Logo } from '@/components/global/Logo.component';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

const datosGeneralesSidebar = [
	{
		icon: PanelsTopLeft,
		label: 'Datos Generales',
		href: '/admin'
	},
	{
		icon: User2,
		label: 'Usuarios',
		href: '/admin/usuarios'
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
	{
		icon: HeartPulse,
		label: 'Tratamientos',
		href: '/estado'
	}
]

const datosToolsSidebar = [
	{
		icon: CircleHelpIcon,
		label: 'Preguntas',
		href: '/admin/preguntas'
	}
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

export const SideBar = () => {
	const router = useRouter();
	return (
		<>
			<Logo />
			<Separator />
			<ScrollArea className='h-[90dvh]'>
				<div>
					<div className="p-1 md:p-3">
						<p className="text-slate-500 mb-2">General</p>
						{datosGeneralesSidebar.map((item, index) => (
							<SideBarItem key={item.label} item={item} />
						))}
					</div>
					<Separator />
					<div className="p-1 md:p-3">
						<p className="text-slate-500 mb-2">Soporte</p>
						{datosSoporteSidebar.map((item, index) => (
							<SideBarItem key={item.label} item={item} />
						))}
					</div>
					<Separator />
					<div className="p-1 md:p-3">
						<p className="text-slate-500 mb-2">Herramientas</p>
						{datosToolsSidebar.map((item, index) => (
							<SideBarItem key={item.label} item={item} />
						))}
					</div>
				</div>
				<div className="text-center p-4">
					<Button
						variant="outline"
						className="w-full"
						onClick={() => router.push('/')}
					>
						Ir a la Página Principal
					</Button>
				</div>
				<Separator />
				<div className="mb-10 p-3 text-center">
					2024. Todos los derechos reservados
				</div>
			</ScrollArea>
		</>
	)
}