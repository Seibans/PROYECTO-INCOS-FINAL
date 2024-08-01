"use client";
import { Divz } from "divz";
import { BackButton } from "@/components/auth/back-button.component";
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import VantaBackground from "@/components/global/VantaBackground";


const DivzPage = () => {
	return (
		<>
		<VantaBackground></VantaBackground>
			<Divz
				showNavButtons={true}
				isExpanded={false}>
				<div>
					<AspectRatio ratio={2 / 3} className="bg-muted">
					{/* 1 */}
						<Image
							src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781153/productos/tfwkrzysg7fongtqhymt.png"
							alt="Imagen"
							className="rounded-md object-cover"
							fill
							// sizes="(max-width: 768px) 1vw, (max-width: 1280px) 50vw, (max-width: 1920px) 25vw"
						/>
					</AspectRatio>
				</div>
				<div>
					{/* 2 */}
					<AspectRatio ratio={2 / 3} className="bg-muted">
						<Image
							src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png"
							className="object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
							fill
						/>
					</AspectRatio>

				</div>
				<div>
					{/* 3 */}
					<AspectRatio ratio={2 / 3} className="bg-muted">
						<Image
							src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781264/productos/t8g1dotgiz9mc68nttrd.png"
							className="object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
							fill
						/>
					</AspectRatio>
				</div>
				<div>
					{/* 4 */}
					<AspectRatio ratio={2 / 3} className="bg-muted">
						<Image
							src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781362/productos/u2aodv72r41cmishkxnw.png"
							className="object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
							fill
						/>
					</AspectRatio>
				</div>
			</Divz>
			<div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
				<BackButton label="< Volver al Inicio" href="/" />
			</div>
		</>
	);
}

export default DivzPage;
