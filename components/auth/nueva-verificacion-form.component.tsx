"use client";

import { CardWrapper } from "@/components/auth/card-wrapper.component";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { nuevaVerificacion } from "@/actions/nueva-verificacion";

import { FormError } from "@/components/form-error.component";
import { FormSuccess } from "@/components/form-success.component";
import { Spinner } from "@/components/spinner.component";

export const FormularioNuevaVerificacion = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const token = searchParams.get("token");


	const onSubmit = useCallback(() => {
		console.log(token);
		// enviarCorreodeVerificacion(email, token);
		//esto evita que se pierda el token en la url cuando react ejecuta 22 veces el use effect
		if(success || error) return;

		//resuelve el error Argument of type 'string | null' is not assignable to parameter of type 'string'.
		//   Type 'null' is not assignable to type 'string'.
		if (!token) {
			setError("Token no encontrado");
			return;
		}; 

		nuevaVerificacion(token)
			.then((data: any) => {
				console.log(data);
				setSuccess(data?.success);
				setError(data?.error);
			})
			.catch((err) => {
				console.log(err);
				setError("Error enviando verificación");
			});
	}, [token, success, error]);

	//TODO: importante, Antonio dice que en react este use effect
	//se ejecuta 2 veces debido a react strict mode que lo llama 2 veces en desarrollo
	useEffect(() => {
		if (token) {
			onSubmit();
		}
	}, [token, onSubmit]);


	return (
		<CardWrapper
			 headerLabel="Verificación de Correo Electrónico"
			 backButtonLabel="Volver al Login"
			 backButtonHref="/auth/login"
		>
			
			<div className="flex items-center justify-center w-full">
				{/* TODO: controla cuando se muestra un componente en base a una condicion */}
				{!success && !error && (
					<Spinner />
				)}
				
				<FormSuccess message={success}/>
				{!success && (
					<FormError message={error}/>
				)}
				{/* <div className="w-full">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Correo Electrónico"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div> */}
			</div>
		</CardWrapper>
	)
}
