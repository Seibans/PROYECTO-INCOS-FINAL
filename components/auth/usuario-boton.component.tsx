"use client";
import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useUsuarioActual } from '@/hooks/use-usuario-actual';
import { LogoutButton } from '@/components/auth/logout.component'
import Link from 'next/link';

export const BotonUsuario = () => {

	const user = useUsuarioActual();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className='bg-orange-400'>
						<FaUser className='text-white' />{user?.name?.[0] || ""}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href={'/admin/perfil'}>
					<DropdownMenuItem className='cursor-pointer'>
						Perfil
					</DropdownMenuItem>
				</Link>

				<DropdownMenuItem className='cursor-pointer'>Configuracion</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer'>Soporte</DropdownMenuItem>
				<DropdownMenuSeparator />

				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon className='h-4 w-4 mr-2' />
						Cerrar Sessión
					</DropdownMenuItem>
				</LogoutButton>
				{/* <DropdownMenuItem className='cursor-pointer' onClick={async () => await logout()}>Cerrar Sesión</DropdownMenuItem> */}

			</DropdownMenuContent>
		</DropdownMenu>
	)
}