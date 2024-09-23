"use client";
import { Divz } from "divz";
import { BackButton } from "@/components/auth/back-button.component";
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import VantaBackground from "@/components/global/VantaBackground";

const DivzPage = () => {
	const demo4Images = [
		"http://localhost:3000/uploads/usuarios/8b1e0f84-7dd2-43a1-8040-898d82564f85_417890787_428242319725696_8357780944331926131_n.jpg",
		"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png",
		"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781264/productos/t8g1dotgiz9mc68nttrd.png",
		"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781362/productos/u2aodv72r41cmishkxnw.png"
	]
	return (
		// <>
		// 	<Divz
		// 		showNavButtons={true}
		// 		isExpanded={false}
		// 	>
		// 		{/* <div className="">
		// 			<AspectRatio ratio={2 / 3} className="bg-muted">
		// 				<img
		// 					src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png"
		// 					alt="thumbnail"
		// 					className="object-cover w-full h-full"
		// 				/>
		// 			</AspectRatio>
		// 		</div>
		// 		<div>
		// 			<AspectRatio ratio={2 / 3} className="bg-muted">
		// 				<img
		// 					src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png"
		// 					alt="thumbnail"
		// 				/>
		// 			</AspectRatio>

		// 		</div>
		// 		<div>
		// 			<AspectRatio ratio={2 / 3} className="bg-muted">
		// 				<img
		// 					src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781264/productos/t8g1dotgiz9mc68nttrd.png"
		// 					alt="thumbnail"
		// 				/>
		// 			</AspectRatio>
		// 		</div>
		// 		<div>
		// 			<AspectRatio ratio={2 / 3} className="bg-muted">
		// 				<img
		// 					src="https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781362/productos/u2aodv72r41cmishkxnw.png"
		// 					alt="thumbnail"
		// 				/>
		// 			</AspectRatio>
		// 		</div> */}
		// 		{[
		// 			"http://localhost:3000/uploads/usuarios/8b1e0f84-7dd2-43a1-8040-898d82564f85_417890787_428242319725696_8357780944331926131_n.jpg",
		// 			"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781102/productos/md0mpornuckk5ozucpo3.png",
		// 			"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781264/productos/t8g1dotgiz9mc68nttrd.png",
		// 			"https://res.cloudinary.com/dwakb0mcp/image/upload/v1698781362/productos/u2aodv72r41cmishkxnw.png"
		// 		].map((src, index) => (
		// 			<div key={index} className="w-full sm:w-64 md:w-80 lg:w-96">
		// 				<AspectRatio ratio={2 / 3} className="bg-muted">
		// 					<img
		// 						src={src}
		// 						alt={`Imagen ${index + 1}`}
		// 						className="object-cover w-full h-full"
		// 					/>
		// 				</AspectRatio>
		// 			</div>
		// 		))}
		// 	</Divz>
		// 	<div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
		// 		<BackButton label="< Volver al Inicio" href="/" />
		// 	</div>
		// </>

		<>
			{/* <img className="background" src="./demo4/bg.jpg" /> */}
			<VantaBackground></VantaBackground>

			<Divz autoPlay={true} isDarkMode={true}>
				{demo4Images.map((imageUrl, index) => (
					<figure key={index} style={{
						background: 'rgba(255, 255, 255, 0)',
						borderRadius: '16px',
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
						backdropFilter: 'blur(8.8px)',
						WebkitBackdropFilter: 'blur(8.8px)',
						border: '1px solid rgba(255, 255, 255, 1)'
					}} >
						<img src={imageUrl} />
						<figcaption>
							{/* <div>{(index + 1).toString().padStart(2, "0")}</div> */}
							{/* <div>{`demo4/${index + 1}.jpg`}</div> */}
						</figcaption>
					</figure>
				))}
			</Divz>
		</>
	);
}

export default DivzPage;
