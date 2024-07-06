import { Navbar } from "./_components/navbar.component";

interface LayoutProtegidoProps {
	children: React.ReactNode;
}

const LayoutProtegido = ({children}: LayoutProtegidoProps) => {
	return (

		<div className="h-full w-full flex flex-col gap-y-10 justify-center items-center">
			<Navbar />
			{children}
		</div>
	);
}

export default LayoutProtegido;