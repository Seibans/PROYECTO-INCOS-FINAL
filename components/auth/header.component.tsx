// import { Poppins } from "next/font/google";
// El @/ es el equivalente a estar en la ruta raiz de la app
import { cn } from "@/lib/utils";
import Image from "next/image";


// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={
        cn("text-3xl font-semibold",
        // font.className
        )}>
        <Image src="https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg" alt="Imagen WP2" width={150} height={150}/>
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
      
    </div>
  );
};
