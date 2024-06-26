"use client";

import { CardWrapper } from "@/components/auth/card-wrapper.component";
import { RiseLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const FormularioNuevaVerificacion = () => {

	const searchParams = useSearchParams();
	const token = searchParams.get("token");


	const onSubmit = useCallback(() => {
		console.log(token);
		// enviarCorreodeVerificacion(email, token);
	}, [token]);

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
				<RiseLoader/>
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
