//TODO: Esto es para que en lugar de ser un server component sea del lado del cliente y ese log de abajo se muestra en el sitio
// "use client";

// import { useEffect } from "react";
// import { Poppins } from "next/font/google";
// El @/ es el equivalente a estar en la ruta raiz de la app
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button.component";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackButton } from "@/components/auth/back-button.component";


// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });


// Definir los elementos estáticos
const staticItems = [
  {
    id: 1,
    name: "Nombre 1",
    designation: "Designación 1",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 2,
    name: "Nombre 2",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 3,
    name: "Nombre 2",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 4,
    name: "Nombre 2",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 5,
    name: "Nombre 2",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  }
];

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

    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-200 to-blue-500">


      <div className="space-y-6 text-center text-white z-10">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md"
            // font.className
          )}
        >
          Veterinaria
        </h1>
        <p className="text-lg">Un nuevo Sistema</p>

        <div>
          <LoginButton asChild>
          {/* <LoginButton> */}
            <Button variant={"outline"} className="bg-transparent">
              Ingresar
            </Button>
          </LoginButton>
          <BackButton label="Ir al Panel De Bento Grid" href="/bento" />
          <BackButton label="Ir al Panel de Divz" href="/divz" />

        </div>
      </div>

      <div className="flex mt-3 z-10">
        <AnimatedTooltip items={staticItems}></AnimatedTooltip>
      </div>
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </main>
  );
}
