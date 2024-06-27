import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid.component";
import {
	BellIcon,
	CalendarIcon,
	FileTextIcon,
	GlobeIcon,
	InputIcon,
} from "@radix-ui/react-icons";
import { BackButton } from "@/components/auth/back-button.component";
import { SparklesCore } from "@/components/ui/sparkles";


const features = [
	{
		Icon: FileTextIcon,
		name: "Modificar Archivos",
		description: "Todas las funcionalidades de agregar archivos se encuentran aquí.",
		href: "/",
		cta: "Leer más",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: InputIcon,
		name: "Edita los Datos en tiempo Real",
		description: "Todos los datos de los usuarios se encuentran aquí.",
		href: "/",
		cta: "Leer más",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
	},
	{
		Icon: GlobeIcon,
		name: "Mascotas en tiempo Real",
		description: "Todos los datos de las mascotas se encuentran aquí.",
		href: "/",
		cta: "Leer más",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
	},
	{
		Icon: CalendarIcon,
		name: "Reserva de Citas Médicas",
		description: "Todos los datos de las citas se encuentran aquí.",
		href: "/",
		cta: "Leer más",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
	},
	{
		Icon: BellIcon,
		name: "Notificationes",
		description:
			"Envia Notificaciones a los usuarios en tiempo Real.",
		href: "/",
		cta: "Leer más",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
	},
];




const BentoPage = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-200 to-blue-500">
				<div className="w-[90%] m-6 z-10 h-dvh">

					<BentoGrid className="lg:grid-rows-3">
						{features.map((feature) => (
							<BentoCard key={feature.name} {...feature} />
						))}
					</BentoGrid>
				</div>
				<div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
					<BackButton label="< Volver al Inicio" href="/" />
				</div>
			</div>
			<div className="w-full absolute inset-0 h-screen">
				<SparklesCore
					id="tsparticlesfullpage"
					background="transparent"
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className="w-full h-full"
					particleColor="#FFFFFF"
				/>
			</div>
		</>
	);
}

export default BentoPage;
