import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { Toaster } from 'sonner';  

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

      <html lang="en">
        {/* <body className={inter.className}>{children}</body> */}
        <body>
          <Toaster richColors position="top-right" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
