import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button.component";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackButton } from "@/components/auth/back-button.component";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HomeIcon, MessageCircle, User2 } from "lucide-react";
import { ToggleModo } from "@/components/toggle.tema";
import GridHexagonal from "@/components/otros/gridHexagonal";
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
const navItems = [
  {
    name: "Principal",
    link: "/",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Panel Grid",
    link: "/bento",
    icon: <User2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Divz",
    link: "/divz",
    icon: (
      <MessageCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];


export default function Home() {
  return (
    // <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-200 to-orange-500">
    <main className="relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-200 to-orange-500">
      <div className="flex justify-end w-full pr-5 pt-5 z-10">
        <ToggleModo />
      </div>
      <div className="space-y-6 text-center z-10 mt-10 h-[1000px]">
        <FloatingNav navItems={navItems} />
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
        <div className="flex mt-3 z-10 justify-center">
          <AnimatedTooltip items={staticItems}></AnimatedTooltip>
        </div>
        {/* <GridHexagonal /> */}
      </div>
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={1}
          maxSize={1.8}
          particleDensity={100}
          className="w-full h-full fixed"
          particleColor="#FFFFFF"
        />
      </div>
    </main>
  );
}
