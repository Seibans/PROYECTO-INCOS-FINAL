import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/doble-factor-confirmacion";
import { getCuentaById } from "@/data/cuenta"

// CORRECION DE NUEVOS ATRIBUTOS EN EL TOKEN minuto 3:10


export const {
  handlers,
  auth,
  signIn,
  signOut,
  //TODO: REVISAR SI ESTE UPDATE FUNCIONA EN LA ULTIMA VERSION O NO
  //para actualizar el usuario en el servidor
  // update,
  unstable_update,
} = NextAuth({
  //En este codigo se define la ruta por defecto cuando ocurre un error de autenticación
  //minuto 3:37
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
         where: {
            id: Number(user.id),
         },
         data: {
            emailVerified: new Date(),
         },
      })
    }
  },
  // Investigar acerca de los eventos de nextauth
  //video 3:33
  callbacks: {
    async signIn({ user, account }) {
      // Permitir OAuth sin verificación de correo electrónico
      // console.log(
      //   user,
      //   account
      // );

      //Estas son las credenciales de google github y facebook
      if (account?.provider === 'credentials') {
        console.log('Credenciales de inicio de sesión');
      };

      //aca sigue la autenticacion por correo normal
      if (account?.provider !== 'credentials') return true;

      const usuarioExistente = await getUserById(Number(user.id));


      // Previene que inicie session un usuario sin verificacion de email
      // if (!usuarioExistente?.emailVerified) return false;


      //ESTA ES LA AUTENTICACION DE DOBLE FACTOR
      // if (usuarioExistente.authDobleFactor) {
      //     const dobleFactorConfirmacion = await getTwoFactorConfirmationByUserId(usuarioExistente.id);
      //     if (!dobleFactorConfirmacion) return false;

      //     // Eliminar la confirmación de dos factores para el próximo inicio de sesión
      //     await db.confirmacionDobleFactor.delete({
      //         where: {
      //             id: dobleFactorConfirmacion.id,
      //         }
      //     })
      // }
      return true;
    },
    // ESTOS SON LOS DATOS DEL USUARIO GUARDADOS EN EL TOKEN
    // el sub es el user id y podemos customizar campos
    //minuto 2:57
    async session({ session, token, user }) {
      // console.log({
      //   sessionToken: token,
      //   session
      // });

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

      // Esto se agrego al minuto 6:25
      if(session.user) {
        session.user.authDobleFactor = token.authDobleFactor as boolean;
      }

      if(session.user) {
        session.user.name = token.name;
        // session.user.email = token.email || session.user.email;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    // Al parecer user y profile siempre estan como undefined asi que no los uses
    // en cambio para obtener el usuario usamos ek getuser si no devuelve el token original
    async jwt({ token, user, profile}) {
      // console.log({token, user, profile});
      // //este es un campo agregado al token
      // token.campoCustom = 'Nuevo Campo';

      // console.log("ME ESTAN LLAMANDO DE NUEVO");

      if(!token.sub) return token;

      const usuarioExistente = await getUserById(Number(token.sub));

      if(!usuarioExistente) return token; 


      // Controlando con que cuenta inicio session si con OAuth o no
      const cuentaExistente = await getCuentaById(usuarioExistente.id);


      // token.isOAuth = cuentaExistente ? true : false;
      token.isOAuth = !!cuentaExistente;
      token.name = usuarioExistente.name;
      token.email = usuarioExistente.email;
      token.rol = usuarioExistente.rol;
      token.authDobleFactor = usuarioExistente.authDobleFactor;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})