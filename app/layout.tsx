import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/tema.provider";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { Toaster } from '@/components/ui/sonner';

//UPLOADTHING
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";



//TANSTACK QUERY
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";








const fontABCSocialBold = localFont({
  src: "./fonts/ABCSocial-Bold.woff2",
  variable: "--font-abc-bold",
});

const fontABCSocialLight = localFont({
  src: "./fonts/ABCSocial-Light.woff2",
  variable: "--font-abc-light",
});

const fontABCSocialRegular = localFont({
  src: "./fonts/ABCSocial-Regular.woff2",
  variable: "--font-abc-regular",
});



export const metadata: Metadata = {
  title: "Veterinaria",
  description: "Proyecto de Grado Pablo Fernandez Aduviri",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased theme-custom",
            fontABCSocialRegular.variable,
            fontABCSocialLight.variable,
            fontABCSocialBold.variable,
          )}
        >
          <NextSSRPlugin
            /**
             * El `extractRouterConfig` extraerá **sólo** las configuraciones de ruta
             * del router para prevenir que información adicional sea
             * información adicional al cliente. Los datos pasados al cliente son los mismos
             * como si fuera a obtener `/api/uploadthing` directamente.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ReactQueryClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              {children}
              <Toaster richColors position="bottom-right" />
            </ThemeProvider>
          </ReactQueryClientProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
