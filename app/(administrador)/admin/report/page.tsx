// app/report/page.tsx
import { prisma } from "@/lib/prisma";
import CalendarioReporteComponent from './_components/FormCalendarioReporte';

export default async function Report() {
  const mascotas = await prisma.mascota.findMany();

  return (
    <div className="mx-auto p-4">
      {/* <div className="p-4 max-w-2xl"> */}
      <div className="p-4 max-w-full">
        <CalendarioReporteComponent />

        <h1 className="text-2xl font-bold mb-4">Reporte de {"Opcion Seleccionada"} VISTA PREVIA</h1>
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
            <p>Especie: {mascota.especie}</p>
            <p>Raza: {mascota.raza || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

