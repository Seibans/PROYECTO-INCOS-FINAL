import { BackButton } from "@/components/auth/back-button.component";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex flex-col gap-y-4">
    //     <nav className="bg-red-500 text-white">
    //     Este es un navbar compartido
    //     </nav>
    //     {children}
    // </div>
    <>
      <div className="relative h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-200 to-blue-500">
        <div className="z-10">
          {children}
        </div>

        {/* TODO: Este componente solo esta aqui y no funciona aun, se puede poner en un componente para rutas hacia atras */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
          <BackButton label="< Volver" href="/" />
        </div>
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
    </>
  );
};

export default AuthLayout;
