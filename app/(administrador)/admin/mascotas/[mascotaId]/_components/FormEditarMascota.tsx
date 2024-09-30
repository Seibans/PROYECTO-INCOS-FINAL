"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Mascota } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from 'zod'

//Librerias para el Form
import React from 'react';
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
import { TipoMascota, Sexo } from "@prisma/client";

import { MascotaSchema } from "@/schemas";
import { razasGatos, razasPerros } from "@/utils/constantes";


//TODO:ARREGLAR
import { useRouter } from 'next/navigation';
import { editarMascota } from "@/actions/mascotas";


type FormEditarMascotaProps = {
	mascota: Mascota;
};


export const FormEditarMascota = (props: FormEditarMascotaProps) => {

	const { mascota } = props;
	const [isPending, startTransition] = React.useTransition();

	const [razaOptions, setRazaOptions] = React.useState<string[]>(["Sin Raza (Especial)"]);
	const router = useRouter();
	console.log(mascota);

	if (mascota.estado == 0) {
		router.push("/admin/mascotas")
	}

	// Definir el formulario utilizando React Hook Form
	const form = useForm<z.infer<typeof MascotaSchema>>({
		resolver: zodResolver(MascotaSchema),
		defaultValues: {
			nombre: mascota.nombre || undefined,
			especie: mascota.especie || undefined,
			raza: mascota?.raza || undefined,
			fechaNacimiento: mascota?.fechaNacimiento || undefined,
			sexo: mascota.sexo || undefined,
			detalles: mascota?.detalles || undefined,
			imagen: mascota?.imagen || undefined,
			// estado: mascota.estado || undefined	
		},
	})

	React.useEffect(() => {
		// Actualizar las opciones de raza cuando el componente se monta
		if (form.getValues("especie") === TipoMascota.Perro) {
			setRazaOptions(razasPerros);
		} else if (form.getValues("especie") === TipoMascota.Gato) {
			setRazaOptions(razasGatos);
		} else {
			setRazaOptions(["Sin Raza (Especial)"])
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
		form.trigger("raza"); // Validar el campo de raza
	}

	function onSubmit(values: z.infer<typeof MascotaSchema>) {
		startTransition(() => {
			toast.promise(editarMascota(values, mascota.id), {
				loading: "Cargando...",
				success: (data) => {
					if (data.error) {
						throw new Error(data.error);
					} else {
						router.refresh();
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
									<Input placeholder="Nombre de la mascota" type="text" {...field} />
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
									// Aca estaba el handleEspecieChange, revisar si se puede poner los 2
									// onValueChange={field.onChange}
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
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
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
								</FormControl>
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
									placeholder="Detalles..."
									className="resize-none"
									{...field}
									value={form.getValues().detalles ?? ''}
								/>
							</FormControl>
							<FormDescription>
								Agrega una descripción detallada de la mascota.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center">
					<Button
						disabled={isPending}
						type="submit"
						className="bg-gradient">
						Editar Mascota
					</Button>
				</div>
			</form>
		</Form>
	)
}

// <FormField
// disabled={isPending}
// control={form.control}
// name="imagen"
// render={({ field }) => (
// 	<FormItem>
// 		<FormLabel>Detalles y Color de la mascota</FormLabel>
// 		<FormControl>{
// 			subirImagen ? (
// 				<p className='text-sm'>Imagen Subida!</p>
// 			) : (
// 				<UploadButton
// 					{...field}
// 					className='bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3'
// 					endpoint='imagenMascota'
// 					content={{
// 						button({ ready }) {
// 							if (ready) return <div>Upload stuff</div>;

// 							return "Getting ready...";
// 						},
// 						allowedContent({ ready, fileTypes, isUploading }) {
// 							if (!ready) return "Checking what you allow";
// 							if (isUploading) return "Seems like stuff is uploading";
// 							return `Stuff you can upload: ${fileTypes.join(", ")}`;
// 						},
// 					}}
// 					onClientUploadComplete={(res) => {
// 						form.setValue("imagen", res?.[0].url);
// 						setsubirImagen(true);
// 						toast.success("Imagen Subida!");

// 					}}
// 					onUploadError={(err) => {
// 						toast.error(err.message);
// 					}}
// 				/>
// 			)}
// 		</FormControl>
// 		<FormDescription>
// 		</FormDescription>
// 		<FormMessage />
// 	</FormItem>
// )}
// />
