import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button.component";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackButton } from "@/components/auth/back-button.component";

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
    name: "Nombre 3",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 4,
    name: "Nombre 4",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  },
  {
    id: 5,
    name: "Nombre 5",
    designation: "Designación 2",
    image: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
  }
];

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-200 to-orange-500">
      <div className="space-y-6 text-center text-white z-10">
        <h1 className={cn("text-6xl font-semibold drop-shadow-md")}>
          Veterinaria Gamaliel
        </h1>
        <p className="text-2xl">Servicios Veterinarios para la comunidad.</p>
        <div className="font-bold">
          {/* <LoginButton mode="modal" asChild> */}
          <LoginButton asChild>
            <Button variant={"outline"} className="bg-gradient hover:text-white">
              Ingresar
            </Button>
          </LoginButton>
        </div>
      <div>
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
          minSize={1}
          maxSize={1.8}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </main>
  );
}
