import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error",
  },
  callbacks: {
    async signIn({user, account}) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      // const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      //     if (!twoFactorConfirmation) return false;

      //     // Delete two factor confirmation for next sign in
      //     await db.twoFactorConfirmation.delete({
      //         where: {
      //             id: twoFactorConfirmation.id,
      //         }
      //     })
      // }
      return true;
    }
  },
  adapter: PrismaAdapter(db),
  session:{strategy: "jwt"},
  ...authConfig,
})