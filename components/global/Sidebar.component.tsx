// "use client";
// import {
// 	BarChart4,
// 	Building,
// 	PanelsTopLeft,
// 	Settings,
// 	ShieldCheck,
// 	CircleHelpIcon,
// 	Calendar,
// 	Building2,
// 	Dog,
// 	Bone,
// 	ClipboardPlusIcon,
// 	Dna,
// 	HeartPulse,
// 	Syringe,
// 	HandCoins,
// 	Pill,
// 	User2,
// 	Hospital
// } from 'lucide-react';
// import { Separator } from '@/components/ui/separator';
// import { Button } from '@/components/ui/button';
// import { SideBarItem } from '@/components/global/SidebarItem.component';
// import { Logo } from '@/components/global/Logo.component';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { useRouter } from 'next/navigation';

// const datosGeneralesSidebar = [
// 	{
// 		icon: PanelsTopLeft,
// 		label: 'Datos Generales',
// 		href: '/admin'
// 	},
// 	{
// 		icon: User2,
// 		label: 'Usuarios',
// 		href: '/admin/usuarios'
// 	},
// 	{
// 		icon: Calendar,
// 		label: 'Agenda',
// 		href: '/admin/agenda'
// 	},
// 	{
// 		icon: Dog,
// 		label: 'Mascotas',
// 		href: '/admin/mascotas'
// 	},
// 	{
// 		icon: ClipboardPlusIcon,
// 		label: 'Historiales',
// 		href: '/admin/historiales'
// 	},
// 	{
// 		icon: Hospital,
// 		label: 'Servicios',
// 		href: '/admin/servicios'
// 	},
// 	{
// 		icon: Pill,
// 		label: 'Medicamentos',
// 		href: '/admin/medicamentos'
// 	},
// 	{
// 		icon: HandCoins,
// 		label: 'Pagos',
// 		href: '/admin/pagos'
// 	},
// 	{
// 		icon: HeartPulse,
// 		label: 'Tratamientos',
// 		href: '/admin/tratamientos'
// 	},
// ]

// const datosToolsSidebar = [
// 	{
// 		icon: CircleHelpIcon,
// 		label: 'Preguntas',
// 		href: '/admin/preguntas'
// 	}
// ]

// const datosSoporteSidebar = [
// 	{
// 		icon: Settings,
// 		label: 'Configuracion',
// 		href: '/admin/configuracion'
// 	},
// 	{
// 		icon: ShieldCheck,
// 		label: 'Seguridad',
// 		href: '/admin/seguridad'
// 	}
// ]

// export const SideBar = () => {
// 	const router = useRouter();
// 	return (
// 		<div className='rounded-l-3xl xl:rounded-r-3xl xl:rounded-l-none bg-lime-200 dark:bg-[#020817]'>
// 			<Logo />
// 			<Separator />
// 			<ScrollArea className='h-[90dvh]'>
// 				<div>
// 					<div className="p-1 md:p-3">
// 						<p className="text-slate-500 mb-1">General</p>
// 						{datosGeneralesSidebar.map((item, index) => (
// 							<SideBarItem key={item.label} item={item} />
// 						))}
// 					</div>
// 					<Separator />
// 					<div className="p-1 md:p-3">
// 						<p className="text-slate-500 mb-1">Soporte</p>
// 						{datosSoporteSidebar.map((item, index) => (
// 							<SideBarItem key={item.label} item={item} />
// 						))}
// 					</div>
// 					<Separator />
// 					<div className="p-1 md:p-3">
// 						<p className="text-slate-500 mb-1">Herramientas</p>
// 						{datosToolsSidebar.map((item, index) => (
// 							<SideBarItem key={item.label} item={item} />
// 						))}
// 					</div>
// 				</div>
// 				<div className="text-center p-4">
// 					<Button
// 						variant="outline"
// 						className="w-full"
// 						onClick={() => router.push('/')}
// 					>
// 						Ir a la Página Principal
// 					</Button>
// 				</div>
// 				<Separator />
// 				<div className="mb-10 p-3 text-center">
// 					2024. Todos los derechos reservados
// 				</div>
// 			</ScrollArea>
// 		</div>
// 	)
// }



"use client";
import {
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  Dog,
  ClipboardPlusIcon,
  HandCoins,
  Pill,
  User2,
  HeartPulse,
  ChevronDown,
  Hospital,
  BatteryLow
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SideBarItem } from '@/components/global/SidebarItem.component';
import { Logo } from '@/components/global/Logo.component';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState, useEffect } from 'react';

export const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHistorialesOpen, setIsHistorialesOpen] = useState(false);

  useEffect(() => {
    setIsHistorialesOpen(pathname.startsWith('/admin/historiales') || pathname.startsWith('/admin/tratamientos'));
  }, [pathname]);

  const isHistorialesActive = pathname.startsWith('/admin/historiales') || pathname.startsWith('/admin/tratamientos');

  return (
    <div className='rounded-l-3xl xl:rounded-r-3xl xl:rounded-l-none bg-lime-200 dark:bg-[#020817]'>
      <Logo />
      <Separator />
      <ScrollArea className='h-[90dvh]'>
        <div>
          <div className="p-1 md:p-3">
            <p className="text-slate-500 mb-1">General</p>
            <SideBarItem icon={PanelsTopLeft} label="Datos Generales" href="/admin" exact={true} />
            <SideBarItem icon={User2} label="Usuarios" href="/admin/usuarios" />
            <SideBarItem icon={Calendar} label="Agenda" href="/admin/agenda" />
            <SideBarItem icon={Dog} label="Mascotas" href="/admin/mascotas" />
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={isHistorialesOpen ? 'item-1' : ''}
              onValueChange={(value) => setIsHistorialesOpen(value === 'item-1')}
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline p-0">
                  <div className={`flex items-center gap-x-2 text-sm mt-2 light:text-slate-700 dark:text-white hover:bg-slate-300/20 rounded-lg py-2 px-4 w-full ${isHistorialesActive ? 'bg-orange-300 dark:bg-orange-600 hover:bg-orange-400 dark:hover:bg-orange-700' : ''}`}>
                    <ClipboardPlusIcon strokeWidth={1} className="w-5 h-5" />
                    <span>Historiales</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-0 pl-3">
                  <SideBarItem icon={ClipboardPlusIcon} label="Historiales" href="/admin/historiales" />
                  <SideBarItem icon={HeartPulse} label="Tratamientos" href="/admin/tratamientos" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SideBarItem icon={Hospital} label="Servicios" href="/admin/servicios" />
            <SideBarItem icon={Pill} label="Medicamentos" href="/admin/medicamentos" />
            <SideBarItem icon={BatteryLow} label="Reportes" href="/admin/report" />
            <SideBarItem icon={HandCoins} label="Pagos" href="/admin/pagos" />
          </div>
          <Separator />
          <div className="p-1 md:p-3">
            <p className="text-slate-500 mb-1">Soporte</p>
            <SideBarItem icon={Settings} label="Configuración" href="/admin/configuracion" />
            <SideBarItem icon={ShieldCheck} label="Seguridad" href="/admin/seguridad" />
          </div>
          <Separator />
          <div className="p-1 md:p-3">
            <p className="text-slate-500 mb-1">Herramientas</p>
            <SideBarItem icon={CircleHelpIcon} label="Preguntas" href="/admin/preguntas" />
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
    </div>
  )
}