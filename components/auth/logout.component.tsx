"use client";

import { logout } from "@/actions/logout";
import next from "next";
// igual puedes usar signOut de next-auth/react

interface LogoutButtonProps {
	children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = async () => {
		await logout();
	};

	return (
		<span onClick={onClick}>
			{children}
		</span>
	)
};