"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function Header() {
	const router = useRouter();
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center space-x-2'>
				<ArrowLeft className='h-5 w-5 mr-2 cursor-pointer' onClick={() => router.back()}/>
				<span className='text-sm font-medium'>Mascota</span>
			</div>
			<div className='flex items-center space-x-2'>
				<span className='text-sm font-medium'>Editar</span>
			</div>
		</div>
	)
}