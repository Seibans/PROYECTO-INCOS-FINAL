import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper.component";

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Ocurrio un error inesperado"
			backButtonHref="/auth/login"
			backButtonLabel="Regresar al Login"
		>
			<div className="w-full flex justify-center items-center">
				<ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
			</div>

		</CardWrapper>
	);
};
