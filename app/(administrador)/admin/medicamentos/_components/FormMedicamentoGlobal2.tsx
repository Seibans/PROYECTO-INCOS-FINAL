"use client"

import { useState, useTransition, forwardRef, useRef, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { MedicamentoSchema } from "@/schemas";
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react";
import { useRouter } from 'next/navigation';
import { registrarMedicamento, editarMedicamento } from '@/actions/medicamentos';
import { toast } from 'sonner';
import { Medicamento, TipoMedicamento } from '@prisma/client';
import { Trash2Icon, EyeIcon, XIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FormPrecioInput from "@/components/ui/form-precio-input";

type FormMedicamentoProps = {
	medicamento?: Medicamento;
	setabrirModal?: Dispatch<SetStateAction<boolean>>;
};

export const FormMedicamentoGlobal = (props: FormMedicamentoProps) => {
	const { medicamento, setabrirModal } = props;
	const [isPending, startTransition] = useTransition();
	const [preview, setPreview] = useState<string | null>(null);
	const [showLightbox, setShowLightbox] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const defaultValues = medicamento ? {
		nombre: medicamento.nombre,
		descripcion: medicamento.descripcion || '',
		stock: medicamento.stock,
		precio: medicamento.precio.toString(),
		tipo: medicamento.tipo as TipoMedicamento,
	} : {
		nombre: "",
		descripcion: "",
		stock: 0,
		precio: "",
		tipo: TipoMedicamento.Otro,
	};

	// Definir el formulario utilizando React Hook Form
	const form = useForm<z.infer<typeof MedicamentoSchema>>({
		resolver: zodResolver(MedicamentoSchema),
		defaultValues,
	});

	useEffect(() => {
		if (medicamento && medicamento.imagen) {
			setPreview(medicamento.imagen);
		}
	}, [medicamento]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		handleFile(file);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		handleFile(file);
	};

	const handleFile = (file?: File) => {
		console.log('Valores del formulario:', file);
		if (file && file.type.startsWith('image/')) {
			form.setValue('imagen', file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};


	const removeImage = () => {
		// form.setValue('imagen', undefined);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};


	const onSubmit = async (values: z.infer<typeof MedicamentoSchema>) => {
		startTransition(async () => {


			const formData = new FormData();
			// Object.entries(values).forEach(([key, value]) => {
			// 	if (value !== undefined) {
			// 		formData.append(key, value instanceof File ? value : value.toString());
			// 	}
			// });

			Object.entries(values).forEach(([key, value]) => {
				if (value !== undefined) {
					if (key === 'imagen' && value instanceof File) {
						formData.append(key, value);
					} else {
						formData.append(key, value.toString());
					}
				}
			});

			// Imprimir los valores del formulario en la consola
			// console.log('Valores del formulario:', Object.fromEntries(formData.entries()));
			// console.log('Valores del formulario:', formData.get('imagen'));

			// Aquí debes llamar a la acción del servidor para registrar el medicamento
			// const action = medicamento 
			// 	? editarMedicamento(formData, medicamento.id) 
			// 	: registrarMedicamento(formData);
			const action = medicamento ? registrarMedicamento(formData) : registrarMedicamento(formData);

			toast.promise(action, {
				loading: "Cargando...",
				success: (data) => {
					if (data.error) {
						throw new Error(data.error);
					} else {
						router.refresh();
						if (setabrirModal) {
							setabrirModal(false);
						}
						return `${data.success}`;
					}
				},
				error: (error) => error.message,
			});
		});
	};

	return (
		<TooltipProvider>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<FormField
							disabled={isPending}
							control={form.control}
							name="nombre"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre:</FormLabel>
									<FormControl>
										<Input placeholder="Nombre del medicamento" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={isPending}
							control={form.control}
							name="descripcion"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción:</FormLabel>
									<FormControl>
										<Textarea placeholder="Descripción del medicamento" {...field} className='resize-none' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<FormField
							disabled={isPending}
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Stock:</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Stock disponible" {...field} min={0} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="precio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Precio</FormLabel>
									<FormControl>
										<Controller
											name="precio"
											control={form.control}
											render={({ field: { onChange, value, ...restField } }) => (
												<FormPrecioInput
													{...restField}
													value={value}
													onValueChange={(value: string | undefined) => onChange(value)}
												/>
											)}
										/>
									</FormControl>
									<FormDescription>
										Ingrese el precio en bolivianos (Bs.) usando el punto (.) como separador decimal.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						disabled={isPending}
						control={form.control}
						name="tipo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de Medicamento:</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecciona el tipo de medicamento" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Pastilla">Pastilla</SelectItem>
										<SelectItem value="Vacuna">Vacuna</SelectItem>
										<SelectItem value="Inyeccion">Inyección</SelectItem>
										<SelectItem value="Crema">Crema</SelectItem>
										<SelectItem value="Suero">Suero</SelectItem>
										<SelectItem value="Polvo">Polvo</SelectItem>
										<SelectItem value="Gel">Gel</SelectItem>
										<SelectItem value="Otro">Otro</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imagen"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imagen del Medicamento:</FormLabel>
								<FormControl>
									<div
										className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
										onDragOver={(e) => e.preventDefault()}
										onDrop={handleDrop}
									>
										<input
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											ref={fileInputRef}
											className="hidden"
										/>
										{preview ? (
											<div className="relative w-full h-full group">
												<img
													src={preview}
													alt="Preview"
													className="w-full h-full object-contain cursor-pointer"
													onClick={() => setShowLightbox(true)}
												/>
												<div
													className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
													onClick={() => setShowLightbox(true)}
												>
													<EyeIcon className="h-10 w-10 text-white" />
												</div>
											</div>
										) : (
											<div className="flex flex-col items-center justify-center h-full">
												<p className="text-gray-500 mb-4">Seleccione o arrastre una imagen</p>
												<Button
													type="button"
													onClick={() => fileInputRef.current?.click()}
													variant="outline"
												>
													Seleccionar imagen
												</Button>
											</div>
										)}

										{preview && (
											<Tooltip>
												<TooltipTrigger asChild>
													<button
														type="button"
														onClick={removeImage}
														className="absolute top-2 right-2 bg-red-500 rounded-full p-2 shadow-md z-10"
													>
														<Trash2Icon className="h-4 w-4 text-white" />
													</button>
												</TooltipTrigger>
												<TooltipContent side='left'>
													<p>Quitar imagen</p>
												</TooltipContent>
											</Tooltip>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-center">
						<Button disabled={isPending} type="submit" className="bg-gradient" variant={"outline"}>
							{medicamento ? 'Editar Medicamento' : 'Registrar Medicamento'}
						</Button>
					</div>
				</form>
			</Form>
		</TooltipProvider>
	);
};