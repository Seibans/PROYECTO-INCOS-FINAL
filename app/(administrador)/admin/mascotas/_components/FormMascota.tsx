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

export const FormMascota = (props: FormMascotaProps) => {
	const [isPending, startTransition] = useTransition();

	const [razaOptions, setRazaOptions] = useState<string[]>(["Sin Raza (Especial)"]);
	const [subirImagen, setsubirImagen] = useState<boolean>(false);
	const router = useRouter();

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
								<FormLabel>Sexo de la Mascota</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value={Sexo.Macho} />
											</FormControl>
											{/* <FormLabel className="font-normal-semibold w-6/12 border"> */}
											<FormLabel className="outline-dotted relative flex cursor-pointer items-center gap-2 rounded-md border-b-2 border-r-2 border-gradient-to-br from-primary to-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-muted peer-checked:bg-muted peer-checked:font-semibold peer-checked:text-primary">
												Macho
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value={Sexo.Hembra} />
											</FormControl>
											<FormLabel className="outline-dotted relative flex cursor-pointer items-center gap-2 rounded-md border-b-2 border-r-2 border-gradient-to-br from-primary to-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-muted peer-checked:bg-muted peer-checked:font-semibold peer-checked:text-primary">
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
				{/* <div className="grid grid-cols-2 gap-3">
					</div> */}
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