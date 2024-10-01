import { CardEstadistica } from "./_components/CardEstadistica";
import { Grafico } from "@/components/admin/Grafico.component";
import { Grafico2 } from "@/components/admin/Grafico2.component";

import { UltimosUsuarios } from "./_components/UltimosUsuarios";
import { Distribuidores } from "./_components/Distribuidores";
import { TotalUsuarios } from "./_components/TotalUsuarios";
import { TablaIntegraciones } from "./_components/TablaIntegraciones";
import { data } from "@/utils/constantes";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-12 text-white bg-black "> */}
      <h2 className="text-2xl mb-4">
        Panel
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {data.map(({ icon, total, average, titulo, tooltipTexto }) => (
          <CardEstadistica
          key={titulo}
          icon={icon}
          total={total}
          average={average}
          titulo={titulo}
          tooltipTexto={tooltipTexto}
          />
          ))}
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <Grafico />
        <Grafico2 />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <UltimosUsuarios/>
        <Distribuidores/>
      </div>
      <div className="flex-col md:gap-x-3 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
        <TotalUsuarios/>
        {/* TODO: CORREGIR EL RESPONSIVO */}
        <TablaIntegraciones/>
      </div>
    </main>
  );
}
