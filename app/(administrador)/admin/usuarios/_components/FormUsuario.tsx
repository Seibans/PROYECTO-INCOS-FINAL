"use client";
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css';

import * as z from "zod";
import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Components UI
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
// ServerComponent
import { registrarUsuarioByAdmin, registrarUsuarioConImagen } from "@/actions/registro";
// Schema
import { RegistroAdminSchema } from "@/schemas";
import { RolUsuario } from "@prisma/client";

import InputImagen, { ImageUploaderRef } from '@/components/admin/FormInputImagen';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";


type FormUsuarioProps = {
	setabrirModal: Dispatch<SetStateAction<boolean>>;
};

export const FormUsuario = (props: FormUsuarioProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [open, setOpen] = useState(false)
	const imageUploaderRef = useRef<ImageUploaderRef>(null);

	const form = useForm<z.infer<typeof RegistroAdminSchema>>({
		resolver: zodResolver(RegistroAdminSchema),
		defaultValues: {
			name: "",
			apellidoPat: "",
			apellidoMat: undefined,
			ci: undefined,
			sexo: undefined,
			image: "",
			email: "",
			celular: undefined,
			direccion: undefined,
			rol: RolUsuario.Usuario
		},
	});

	const onSubmit = (values: z.infer<typeof RegistroAdminSchema>) => {
		const formData = new FormData();
		Object.entries(values).forEach(([key, value]) => {
			if (value !== undefined) {
				if (key === 'archivo' && value instanceof File) {
					formData.append(key, value);
				} else {
					formData.append(key, value.toString());
				}
			}
		});
		startTransition(() => {
			const action = formData.get('archivo') ? registrarUsuarioConImagen(formData) : registrarUsuarioByAdmin(values);
			toast.promise(action, {
				loading: "Cargando...",
				success: (data) => {
					if (data.error) {
						throw new Error(data.error);
					} else {
						router.refresh();
						props.setabrirModal(false);
						return `${data.success}`;
					}
				},
				error: (error) => error.message,
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombres *:</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="Nombres"
										type="text"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<FormField
							control={form.control}
							name="apellidoPat"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apellido Paterno:</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="Apellido Paterno"
											type="text"
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
											{...field}
											disabled={isPending}
											placeholder="Apellido Materno"
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="ci"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Carnet de Identidad:</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="1234567-A"
										type="text"
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
													className: 'bg-white text-black dark:bg-gray-800 dark:text-white',
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email *:</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="veterinaria@ejemplo.com"
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="rol"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rol del Usuario *:</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione un rol" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={RolUsuario.Usuario}>Usuario (Cliente)</SelectItem>
										<SelectItem value={RolUsuario.Veterinario}>Veterinario</SelectItem>
										<SelectItem value={RolUsuario.Administrador}>Administrador</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imagen de Perfil del Usuario (Opcional):</FormLabel>
									<FormControl>
										<InputImagen
											ref={imageUploaderRef}
											onImageChange={(file) => {
												if (file) {
													field.onChange(file.name);
													form.setValue('archivo', file);
												} else {
													field.onChange('');
													form.setValue('archivo', undefined);
												}
												form.trigger('image');
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					<Button disabled={isPending} type="submit" className="w-full bg-gradient">
						Registrar Usuario
					</Button>
			</form>
		</Form>
	);
};
