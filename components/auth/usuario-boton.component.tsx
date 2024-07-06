"use client";
import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useUsuarioActual } from '@/hooks/use-usuario-actual';
import { LogoutButton } from '@/components/auth/logout.component'

export const BotonUsuario = () => {

	const user = useUsuarioActual();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ""}/>
					<AvatarFallback className='bg-orange-400'>
						<FaUser className='text-white' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon className='h-4 w-4 mr-2'/>
						Cerrar Sessión
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}