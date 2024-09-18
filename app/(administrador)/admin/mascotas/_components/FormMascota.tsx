"use client"

//Librerias para el Form
import React, { useEffect, useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { es } from "date-fns/locale";

//Libs
import { cn } from "@/lib/utils"
import { formatearFecha } from "@/lib/formatearFecha"


//Iconos
import { CalendarIcon } from "lucide-react"

//Componentes de UI
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from '@/components/ui/textarea';


// enums de Prisma
import { TipoMascota, Sexo } from "@prisma/client";

import { MascotaSchema } from "@/schemas";
import { registrarMascota } from "@/actions/mascotas";
import { UploadButton } from '@/utils/uploadthing';
import { set } from 'date-fns';

import { razasGatos, razasPerros } from "@/utils/constantes";


//De esta forma se cierra el modal al cerrar el formulario o al registrar exitosamente
import {Dispatch, SetStateAction} from "react";


//TODO:ARREGLAR
import { useRouter } from 'next/navigation';

type FormMascotaProps = {
	setabrirModal: Dispatch<SetStateAction<boolean>>;
};

type Usuario = {
	value: number
	label: string
}

const usuarios: Usuario[] = [
	{ value: 1, label: "Juan Pérez" },
	{ value: 2, label: "María García" },
	{ value: 3, label: "Carlos Fernández" },
	{ value: 4, label: "Carlos Fernández" },
	{ value: 5, label: "Carlos Fernández" },
	{ value: 6, label: "Carlos Fernández" },
	{ value: 7, label: "Carlos Fernández" },
	{ value: 8, label: "Carlos Fernández" },
	{ value: 9, label: "Carlos Fernández" },
	{ value: 10, label: "Carlos Fernández" },
	{ value: 11, label: "Carlos Fernández" },
	{ value: 12, label: "Carlos Fernández" },
	{ value: 13, label: "Carlos Fernández" },
	{ value: 14, label: "Carlos Fernández" },
	{ value: 15, label: "Carlos Fernández" },
	{ value: 16, label: "Carlos Fernández" },
	{ value: 17, label: "Carlos Fernández" },
	{ value: 18, label: "Carlos Fernández" },
	{ value: 19, label: "Carlos Fernández" },
	{ value: 20, label: "Carlos Fernández" },
]

type Estado = {
	value: number
	label: string
}

const estados: Estado[] = [
	{ value: 1, label: "Registrado" },
	{ value: 2, label: "Atendido" },
	{ value: 3, label: "En Tratamiento" },
	{ value: 4, label: "En Observación" },
	{ value: 5, label: "Dado de Alta" },
	{ value: 6, label: "Internado" },
	{ value: 7, label: "Fallecido" }
]

export const FormMascota = (props: FormMascotaProps) => {
	const [isPending, startTransition] = useTransition();

	const [razaOptions, setRazaOptions] = useState<string[]>(["Sin Raza (Especial)"]);
	const [subirImagen, setsubirImagen] = useState<boolean>(false);
	const router = useRouter();



	// Buscador y select de Usuario
	const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
	const [searchTermUsuario, setSearchTermUsuario] = useState("");
	const [openUsuario, setOpenUsuario] = useState(false);

	// Buscador y select de Estado
	const [selectedEstado, setSelectedEstado] = useState<Estado | null>(null);
	const [searchTermEstado, setSearchTermEstado] = useState("");
	const [openEstado, setOpenEstado] = useState(false);

	const filteredUsuarios = React.useMemo(() =>
		usuarios.filter((usuario) =>
			usuario.label.toLowerCase().includes(searchTermUsuario.toLowerCase())
		),
		[searchTermUsuario]
	);

	const filteredEstados = React.useMemo(() =>
		estados.filter((estado) =>
			estado.label.toLowerCase().includes(searchTermEstado.toLowerCase())
		),
		[searchTermEstado]
	);


	// Definir el formulario utilizando React Hook Form
	const form = useForm<z.infer<typeof MascotaSchema>>({
		resolver: zodResolver(MascotaSchema),
		defaultValues: {
			nombre: "",
			especie: undefined,
			raza: "Sin Raza (Especial)",
			fechaNacimiento: undefined,
			sexo: undefined,
			detalles: undefined,
			imagen: "",
		},
	})
	useEffect(() => {
		// Actualizar las opciones de raza cuando el componente se monta
		if (form.getValues("especie") === TipoMascota.Perro) {
			setRazaOptions(razasPerros);
		} else if (form.getValues("especie") === TipoMascota.Gato) {
			setRazaOptions(razasGatos);
		}
	}, []); // [] asegura que solo se ejecute una vez al montar el componente

	const handleEspecieChange = (value: TipoMascota) => {
		form.setValue("raza", "Sin Raza (Especial)");
		
		if (value === TipoMascota.Perro) {
			form.setValue("especie", TipoMascota.Perro);
			setRazaOptions(razasPerros);
		} else if (value === TipoMascota.Gato) {
			form.setValue("especie", TipoMascota.Gato);
			setRazaOptions(razasGatos);
		} else {
			form.setValue("especie", TipoMascota.Otro);
			setRazaOptions(["Sin Raza (Especial)"]);
		}
	}

	// Definir el manejador de envío del formulario
	function onSubmit(values: z.infer<typeof MascotaSchema>) {
		console.log(values)
		startTransition(() => {
			toast.promise(registrarMascota(values), {
				loading: "Cargando...",
				success: (data) => {
					if (data.error) {
						throw new Error(data.error);
					} else {
						router.refresh();
						//Extraerlo de props
						props.setabrirModal(false);
						return `${data.success}`;
					}
				},
				error: (error) => error.message,
			});
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<FormField
						disabled={isPending}
						control={form.control}
						name="nombre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input placeholder="Nombre de la mascota" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						disabled={isPending}
						control={form.control}
						name="especie"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Especie</FormLabel>
								<Select
									onValueChange={handleEspecieChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecciona la Especie" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={TipoMascota.Perro}>Perro</SelectItem>
										<SelectItem value={TipoMascota.Gato}>Gato</SelectItem>
										<SelectItem value={TipoMascota.Otro}>Otro...</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					disabled={isPending}
					control={form.control}
					name="raza"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Raza</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona la Raza" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{razaOptions.map((raza) => (
										<SelectItem key={raza} value={raza}>{raza}</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<FormField
						disabled={isPending}
						control={form.control}
						name="sexo"
						render={({ field }) => (
						<FormItem>
							<FormLabel>Sexo de la Mascota:</FormLabel>
							<FormControl>
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								className="flex gap-6 xl-justify-between"
							>
								<FormItem>
								<FormLabel className="radio-group">
									<FormControl>
									<RadioGroupItem value={Sexo.Macho} />
									</FormControl>
									Macho
								</FormLabel>
								</FormItem>
								<FormItem>
								<FormLabel className="radio-group">
									<FormControl>
									<RadioGroupItem value={Sexo.Hembra} />
									</FormControl>
									Hembra
								</FormLabel>
								</FormItem>
							</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
						)}
					/>
					<FormField
						disabled={isPending}
						control={form.control}
						name="fechaNacimiento"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fecha de Nacimiento</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													formatearFecha(field.value, "PPP")
												) : (
													<span>Selecciona una Fecha</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											locale={es}
											captionLayout="buttons"
											// captionLayout="dropdown-buttons"
											// fromYear={2010}
											// toYear={2024}
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("2000-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					disabled={isPending}
					control={form.control}
					name="detalles"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Detalles y Color de la mascota</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Detalles de la mascota"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Agrega una descripción detallada de la mascota.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					disabled={isPending}
					control={form.control}
					name="imagen"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Detalles y Color de la mascota</FormLabel>
							<FormControl>{
								subirImagen ? (
									<p className='text-sm'>Imagen Subida!</p>
								) : (
									<p className='text-sm'>Imagen Subida!</p>
								)}
							</FormControl>
							<FormDescription>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>


				{/* Select Usuario */}
				<div className="mb-4">
					<Select
						open={openUsuario}
						onOpenChange={setOpenUsuario}
						value={selectedUsuario?.value.toString() || ""}
						onValueChange={(value) => {
							const usuarioSeleccionado = usuarios.find(u => u.value.toString() === value);
							setSelectedUsuario(usuarioSeleccionado || null);
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Selecciona el Usuario Propietario" />
						</SelectTrigger>
						<SelectContent>
							<div className="mb-2 px-2">
								<Input
									placeholder="Buscar Usuario..."
									value={searchTermUsuario}
									onChange={(e) => setSearchTermUsuario(e.target.value)}
									className="h-8"
								/>
							</div>
							{filteredUsuarios.length === 0 ? (
								<div className="py-2 px-2 text-sm text-gray-500">
									No se encontraron resultados.
								</div>
							) : (
								filteredUsuarios.map((usuario) => (
									<SelectItem key={usuario.value.toString()} value={usuario.value.toString()}>
										{usuario.label}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				{/* Select Estado */}
				<div className="mb-4">
					<Select
						open={openEstado}
						onOpenChange={setOpenEstado}
						value={selectedEstado?.value.toString() || ""}
						onValueChange={(value) => {
							const estadoSeleccionado = estados.find(e => e.value.toString() === value);
							setSelectedEstado(estadoSeleccionado || null);
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Selecciona el Estado" />
						</SelectTrigger>
						<SelectContent>
							<div className="mb-2 px-2">
								<Input
									placeholder="Buscar Estado..."
									value={searchTermEstado}
									onChange={(e) => setSearchTermEstado(e.target.value)}
									className="h-8"
								/>
							</div>
							{filteredEstados.length === 0 ? (
								<div className="py-2 px-2 text-sm text-gray-500">
									No se encontraron resultados.
								</div>
							) : (
								filteredEstados.map((estado) => (
									<SelectItem key={estado.value.toString()} value={estado.value.toString()}>
										{estado.label}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>



					

				<div className="flex justify-center">
					<Button
						disabled={isPending}
						type="submit"
						className="">
							Registrar Mascota
					</Button>
				</div>
			</form>
		</Form>
	)
}



// <UploadButton
// 	{...field}
// 	className='bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3'
// 	endpoint='imagenMascota'
// 	content={{
// 		button({ ready }) {
// 		  if (ready) return <div>Upload stuff</div>;
		
// 		  return "Getting ready...";
// 		},
// 		allowedContent({ ready, fileTypes, isUploading }) {
// 		  if (!ready) return "Checking what you allow";
// 		  if (isUploading) return "Seems like stuff is uploading";
// 		  return `Stuff you can upload: ${fileTypes.join(", ")}`;
// 		},
// 	  }}
// 	onClientUploadComplete={(res) => {
// 		form.setValue("imagen", res?.[0].url);
// 		setsubirImagen(true);
// 		toast.success("Imagen Subida!");

// 	}}
// 	onUploadError={(err) => {
// 		toast.error(err.message);
// 	}}
// />