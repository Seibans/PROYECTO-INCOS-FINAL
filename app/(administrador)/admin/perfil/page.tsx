"use client";
import { HeaderFormAdmin } from "./_components/HeaderAdmin";
import { FormPerfilAdmin } from "@/components/global/FormPerfilAdmin";


export default function PerfilAdminPage() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center flex-col">
				<FormPerfilAdmin />
			</div>
		</div>
	)
}