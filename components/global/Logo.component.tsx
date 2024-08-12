"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
	const router = useRouter();

	return (
		<div className="min-h-16 h-16 flex items-center px-4 border-b cursor-pointer" onClick={() => router.push("/")}>
			<Image src="/images/gamaliel.png" alt="Logo" width={20} height={20} priority className="mr-2"/>
			<h2 className="font-bold text-xl">Gamaliel</h2>
		</div>
	)
}