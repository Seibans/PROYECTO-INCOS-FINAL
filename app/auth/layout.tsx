import { BackButton } from "@/components/auth/back-button.component";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-100 to-orange-400">
        <div className="z-10">
          {children}
          <div className="hidden absolute right-7 bottom-7 lg:block">
            <Image src="/images/imagen-gato.png" alt="alt" width={300} height={300} />
          </div>
        </div>
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
