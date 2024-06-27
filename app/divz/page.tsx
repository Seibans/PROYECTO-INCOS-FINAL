"use client";
import { Divz } from "divz";
import { BackButton } from "@/components/auth/back-button.component";
import Image from "next/image";


const DivzPage = () => {
	return (
		<>
			<Divz
				showNavButtons={false}
				isExpanded={true}>
				<div>
					1
					<Image
						src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781153/productos/tfwkrzysg7fongtqhymt.png"
						height="500"
						width="500"
						className="w-[80px] object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</div>
				<div>
					2
					<Image
						src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png"
						height="500"
						width="500"
						className="w-[80px] object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>	
				</div>
				<div>
					3
					<Image
						src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781264/productos/t8g1dotgiz9mc68nttrd.png"
						height="500"
						width="500"
						className="w-[80px] object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</div>
				<div>
					4
					<Image
						src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781362/productos/u2aodv72r41cmishkxnw.png"
						height="500"
						width="500"
						className="w-[80px] object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</div>
			</Divz>
			<div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
				<BackButton label="< Volver al Inicio" href="/" />
			</div>
		</>
	);
}

export default DivzPage;
