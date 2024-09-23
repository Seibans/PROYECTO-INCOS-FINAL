"use client"

import { E164Number } from "libphonenumber-js/core";

import 'react-phone-number-input/style.css';
import { zodResolver } from "@hookform/resolvers/zod"
import { RolUsuario } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from 'zod'

//Librerias para el Form
import React, { useEffect, useState, useTransition } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

import { ConfiguracionSchema } from "@/schemas";
import { UploadButton } from '@/utils/uploadthing';
import { set } from 'date-fns';

import PhoneInput from "react-phone-number-input";

//TODO:ARREGLAR
import { useRouter } from 'next/navigation';
import { UsuarioT } from "@/types";
import { editarUsuario } from "@/actions/usuarios";


type FormEditarUsuarioProps = {
	usuario: UsuarioT;
};


export const FormEditarUsuario = (props: FormEditarUsuarioProps) => {

	const { usuario } = props;
	const [isPending, startTransition] = useTransition();
	const [subirImagen, setsubirImagen] = useState<boolean>(false);
	const router = useRouter();

	// console.log(usuario);
	// console.log(usuario.estado);

	if (usuario.estado == 0) {
		console.log("hola");
		router.push("/admin/usuarios")
	}
	// Definir el formulario utilizando React Hook Form
	const form = useForm<z.infer<typeof ConfiguracionSchema>>({
		resolver: zodResolver(ConfiguracionSchema),
		defaultValues: {
			name: usuario.name || undefined,
			apellidoPat: usuario.apellidoPat || undefined,
			apellidoMat: usuario.apellidoMat || undefined,
			ci: usuario.ci || undefined,
			email: usuario.email || undefined,
			// sexo: usuario.sexo as "M" | "F" | undefined,
			// Asumiendo que usuario.sexo es un string "M" o "F"
			sexo: usuario.sexo === "M" || usuario.sexo === "F" ? usuario.sexo : undefined,
			direccion: usuario?.direccion || undefined,
			celular: usuario?.celular || undefined,
			// Definir rol como una cadena de texto
			rol: usuario.rol as "Usuario" | "Administrador" | undefined,
			estado: usuario.estado || undefined
		},
	})

	// Definir el manejador de envío del formulario
	function onSubmit(values: z.infer<typeof ConfiguracionSchema>) {
		console.log(values);
		startTransition(() => {
			toast.promise(editarUsuario(values, usuario.id), {
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
				<FormField
					disabled={isPending}
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombres:</FormLabel>
							<FormControl>
								<Input placeholder="Nombre" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="apellidoPat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellido Paterno:</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Apellido Paterno"
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="apellidoMat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellido Materno:</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Apellido Materno"
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

				</div>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Email"
									{...field}
									readOnly={true}
								/>
							</FormControl>
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
								<FormLabel>Genero:</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex gap-6 xl-justify-between"
									>
										<FormItem>
											<FormLabel className="radio-group">
												<FormControl>
													<RadioGroupItem value={"M"} />
												</FormControl>
												Hombre
											</FormLabel>
										</FormItem>
										<FormItem>
											<FormLabel className="radio-group">
												<FormControl>
													<RadioGroupItem value={"F"} />
												</FormControl>
												Mujer
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ci"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Carnet de Identidad:</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Carnet de Identidad"
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					disabled={isPending}
					control={form.control}
					name="direccion"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Direccion:</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Ciudad, Zona, Calle, Numero, Localidad"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-6 xl:flex-row">
					<FormField
						control={form.control}
						name="celular"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="shad-input-label">Celular:</FormLabel>
								<FormControl>
									<PhoneInput
										defaultCountry="BO"
										placeholder="+591 00000000"
										international
										withCountryCallingCode
										value={field.value as E164Number | undefined}
										onChange={field.onChange}
										className="input-phone"
										countries={['PE', 'BO', 'AR', 'CL', 'CO', 'EC', 'MX', 'PY', 'UY', 'VE']}
										countrySelectProps={{
											className: 'bg-white text-black dark:bg-gray-800 dark:text-white !w-[10rem]',
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="rol"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rol</FormLabel>
							<Select
								// {...field}
								disabled={isPending}
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Seleccione un rol" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										value={RolUsuario.Usuario}>Usuario</SelectItem>
									<SelectItem
										value={RolUsuario.Administrador}>Administrador</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormField
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
									<UploadButton
										{...field}
										className='bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3'
										endpoint='imagenMascota'
										content={{
											button({ ready }) {
												if (ready) return <div>Upload stuff</div>;

												return "Getting ready...";
											},
											allowedContent({ ready, fileTypes, isUploading }) {
												if (!ready) return "Checking what you allow";
												if (isUploading) return "Seems like stuff is uploading";
												return `Stuff you can upload: ${fileTypes.join(", ")}`;
											},
										}}
										onClientUploadComplete={(res) => {
											form.setValue("imagen", res?.[0].url);
											setsubirImagen(true);
											toast.success("Imagen Subida!");

										}}
										onUploadError={(err) => {
											toast.error(err.message);
										}}
									/>
								)}
							</FormControl>
							<FormDescription>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<div className="flex justify-center">
					<Button
						disabled={isPending}
						type="submit"
						className="bg-gradient"
						variant="outline">
						Editar Los Datos de la Cuenta
					</Button>
				</div>
			</form>
		</Form>
	)
}