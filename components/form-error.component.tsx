import { ExclamationTriangleIcon} from "@radix-ui/react-icons";

interface FormErrorProps {
	// children: React.ReactNode;
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	//Este if controla que no este un campo vacio en rojo
	if (!message) return null;

	return (
		<>
		<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<ExclamationTriangleIcon className="h-4 w-4"/>
			<p>{message}</p>
		</div>
		</>
	);
}