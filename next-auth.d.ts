import NextAuth, { DefaultSession } from "next-auth"


export type UsuarioExtendido = DefaultSession["user"] & {
	rol: "Administrador" | "Usuario";
	authDobleFactor: boolean;
	isOAuth: boolean;
	celular: string | null;
}

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: UsuarioExtendido
	}
}

import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    rol?: "Administrador" | "Usuario"
  }
}
