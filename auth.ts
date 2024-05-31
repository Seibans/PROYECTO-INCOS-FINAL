import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"

// CORRECION DE NUEVOS ATRIBUTOS EN EL TOKEN minuto 3:10


export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      const usuarioExistente = await getUserById(Number(user.id));


      // Previene que inicie session un usuario sin verificacion de email
      // if (!usuarioExistente?.emailVerified) return false;

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
    },
    // ESTOS SON LOS DATOS DEL USUARIO GUARDADOS EN EL TOKEN
    // el sub es el user id y podemos customizar campos
    //minuto 2:57
    async session({ session, token, user }) {
      console.log({
        sessionToken: token,
        session
      });

      // if (session.user) {
      //   session.user.campoCustom = token.campoCustom;
      // }


      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.rol && session.user) {
        // session.user.rol = token.rol as "ADMINISTRADOR" | "USUARIO";
        session.user.rol = token.rol;
        // el agregado de este rol esta definido en next-auth.bind.ts
        //si vuelve a fallar revisa el video 3:14
      }

      return session;
    },
    // Al parecer user y profile siempre estan como undefined asi que no los uses
    // en cambio para obtener el usuario usamos ek getuser si no devuelve el token original
    async jwt({ token, user, profile}) {
      // console.log({token, user, profile});
      // //este es un campo agregado al token
      // token.campoCustom = 'Nuevo Campo';

      if(!token.sub) return token;

      const usuarioExistente = await getUserById(Number(token.sub));

      if(!usuarioExistente) return token;

      token.rol = usuarioExistente.rol;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})