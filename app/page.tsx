//TODO: Esto es para que en lugar de ser un server component sea del lado del cliente y ese log de abajo se muestra en el sitio
// "use client";

// import { useEffect } from "react";
// import { Poppins } from "next/font/google";
// El @/ es el equivalente a estar en la ruta raiz de la app
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button.component";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

export default function Home() {
  // Este useeffect solo se usa en client component
  // useEffect(()=> {
  //   console.log("Cargando");
  // }, []);
  //Esto es porque no usa el use client de arriba
  // console.log("Este es un Server Component por lo que este mensaje no se muestra en la pagina si no en la consola de abajo");
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">

    // </main>

    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-red-200 to-red-600">
      <div className="space-y-6 text-center text-white">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md"
            // font.className
          )}
        >
          🚀Autenticación
        </h1>
        <p className="text-lg">Un servicio sencillo de Autenticación</p>

        <div>
          {/* <LoginButton mode="modal"> */}
          <LoginButton>
            <Button variant={"outline"} className="bg-transparent">
              Ingresar
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
