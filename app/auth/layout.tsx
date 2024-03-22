import { BackButton } from "@/components/auth/back-button.component";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex flex-col gap-y-4">
    //     <nav className="bg-red-500 text-white">
    //     Este es un navbar compartido
    //     </nav>
    //     {children}
    // </div>
    <div className="relative h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-red-200 to-red-600">
      {children}

      {/* TODO: Este componente solo esta aqui y no funciona aun, se puede poner en un componente para rutas hacia atras */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20">
        <BackButton label="< Volver" href="/"/>
      </div>
    </div>
  );
};

export default AuthLayout;
