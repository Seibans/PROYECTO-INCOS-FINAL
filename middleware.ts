import authConfig  from "@/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix
} from "@/routes";

import { NextResponse } from "next/server";


const { auth } = NextAuth(authConfig);

// ORIGINAL
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







export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("Request URL:", nextUrl.pathname);
  console.log("User logged in:", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("Redirecting to default login redirect");
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    console.log("Redirecting to login with callback URL:", encodedCallbackUrl);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}