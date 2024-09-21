import authConfig  from "@/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix
} from "@/routes";

import { NextResponse } from "next/server";

import { RolUsuario } from "@prisma/client";

const { auth } = NextAuth(authConfig);

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
export default auth(async (req) => {
  const { nextUrl } = req;



  // Obtener el token JWT
  // const token = await getToken({ req, secret });
  
  // if (!token) {
  //   // Si no hay token, redirigir al login o devolver respuesta adecuada
  //   return NextResponse.redirect("/auth/login");
  // }

  // console.log("TOKEN en Middleware:", token);





  const isLoggedIn = !!req.auth;

  // console.log("Request URL:", nextUrl.pathname);
  // console.log("User logged in:", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Accede al rol del usuario correctamente
      const userRole = req.auth?.user?.rol;
      // console.log("User role:", userRole);
      // console.log("Auth object:", req.auth);
      // console.log("User object:", req.auth?.user);

      // const { auth } = req;
      // console.log("Auth object:", auth);
      
      // if (auth?.user) {
      //   console.log("User role:", auth.user.rol);
      // }
      
      // Redirige basado en el rol
      if (userRole === RolUsuario.Administrador) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      } else if (userRole === RolUsuario.Usuario) {
        return NextResponse.redirect(new URL("/cliente", nextUrl));
      }
      // Si no hay un rol específico, usa el redirect por defecto
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {

    // Es posible que esto sea lo que corrige lo del usuario al no poder loguearse
    // 
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    console.log("Redirigiendo al login con el callback URL:", encodedCallbackUrl);
    
    // return Response.redirect(new URL("/auth/login", nextUrl)); //esto estaba en un principio antes de todo pero no me daba  
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}



// export default auth((req) => {
//   //Aca podemos acceder al token y comprobar si el usuario es Admin o no
//   const {nextUrl} = req;
//   const isLoggedIn = !!req.auth;
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   if(isApiAuthRoute){
//     return null;
//   }
//   if(isAuthRoute){
//     if(isLoggedIn){
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }
//   if(!isLoggedIn && !isPublicRoute){
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//         callbackUrl += nextUrl.search;
//     }
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);
//     return Response.redirect(new URL(
//         `/auth/login?callbackUrl=${encodedCallbackUrl}`,
//         nextUrl
//     ));
//   }
//   return null;
// })


// if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     console.log("Redirecting to default login redirect");
  //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return NextResponse.next();
  // }



//   import authConfig from "@/auth.config";
// import NextAuth from "next-auth";

// import {
//   DEFAULT_LOGIN_REDIRECT,
//   authRoutes,
//   publicRoutes,
//   apiAuthPrefix
// } from "@/routes";

// import { NextResponse } from "next/server";
// import { RolUsuario } from "@prisma/client";
// import { getToken } from "next-auth/jwt";

// const { auth } = NextAuth(authConfig);

// export default auth(async (req) => {
//   const { nextUrl } = req;

//   // Obtén el token con el req completo y asegúrate de pasar el secreto
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
//   console.log("Token:", token);
//   const isLoggedIn = !!token;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return NextResponse.next();
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       const userRole = token?.user?.rol;
//       console.log("User role:", userRole);

//       if (userRole === RolUsuario.Administrador) {
//         return NextResponse.redirect(new URL("/admin", nextUrl));
//       } else if (userRole === RolUsuario.Usuario) {
//         return NextResponse.redirect(new URL("/client", nextUrl));
//       }
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return NextResponse.next();
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);
//     console.log("Redirigiendo al login con el callback URL:", encodedCallbackUrl);

//     return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
