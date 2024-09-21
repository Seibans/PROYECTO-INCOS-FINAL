"use client"

// Librerías para el Formulario
import { useState, useTransition, forwardRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

// Esquema Zod
import { MedicamentoSchema } from "@/schemas";

// Componentes de UI
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
import { registrarMedicamento } from '@/actions/medicamentos';
import { toast } from 'sonner';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

// Componente personalizado para el CurrencyInput
const FormCurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
	(props, ref) => {
		return (
			<CurrencyInput
				id="input-example"
				name="precio"
				placeholder="Ingrese el precio"
				decimalsLimit={2}
				prefix="Bs."
				decimalSeparator="."
				groupSeparator=","
				intlConfig={{ locale: "es-BO", currency: "BOB" }}
				allowNegativeValue={false}
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				{...props}
				ref={ref}
			/>
		)
	}
)
FormCurrencyInput.displayName = "FormCurrencyInput"

type FormMedicamentoProps = {
	setabrirModal: Dispatch<SetStateAction<boolean>>;
};
// Definir el formulario utilizando React Hook Form
export const FormMedicamento = (props: FormMedicamentoProps) => {
	const [isPending, startTransition] = useTransition();
	const [subirImagen, setsubirImagen] = useState<boolean>(false);
	const router = useRouter();


	const form = useForm<z.infer<typeof MedicamentoSchema>>({
		resolver: zodResolver(MedicamentoSchema),
		defaultValues: {
			nombre: "",
			descripcion: "",
			stock: 0,
			precio: "",
			tipo: "Otro",
		},
	});

	const onSubmit = (values: z.infer<typeof MedicamentoSchema>) => {
		startTransition(() => {
			console.log(values);
			// Aquí puedes llamar a tu acción para registrar el medicamento
			toast.promise(registrarMedicamento(values), {
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
									<Textarea placeholder="Descripción del medicamento" {...field} className='resize-none'/>
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
											<FormCurrencyInput
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
				<div className="flex justify-center">
					<Button disabled={isPending} type="submit" className="bg-gradient">
						Registrar Medicamento
					</Button>
				</div>
			</form>
		</Form>
	);
};


{/* <CurrencyInput
					id="input-example"
					name="precio"
					placeholder="Ingrese el precio"
					decimalsLimit={2}
					prefix='Bs.'
					decimalSeparator='.'
					groupSeparator=','
					intlConfig={{ locale: 'es-BO', currency: 'BOB' }}
					disabled={isPending}
					allowNegativeValue={false}
					onValueChange={(value, name, values) => console.log(value, name, values)}
					className="form-control border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 sm:text-sm"
					/> */}