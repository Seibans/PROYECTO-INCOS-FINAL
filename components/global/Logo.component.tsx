"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
	const router = useRouter();

	return (
		<div className="min-h-16 h-16 flex items-center px-4 cursor-pointer w-11/12 rounded-l-3xl bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-300 to-transparent" onClick={() => router.push("/")}>
			<Image src="/images/gamaliel.png" alt="Logo" width={50} height={50} priority className="mr-2"/>
			<h2 className="font-bold text-xl">Gamaliel</h2>
		</div>
	)
}