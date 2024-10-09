// app/report/page.tsx
import { db } from '@/lib/db';
import GeneratePDFButton from './_components/boton';
import CalendarioReporteComponent from './_components/calendarioReporte';
import CalendarioSimple from './_components/calendarioSimple';

export default async function Report() {
  const mascotas = await db.mascota.findMany({
  });

  return (
    <div className="container mx-auto p-4">
      {/* <div className="p-4 max-w-2xl"> */}
      <div className="p-4 max-w-full">
        <CalendarioSimple />
        <CalendarioReporteComponent />
        <h1 className="text-2xl font-bold mb-4">Reporte de Mascotas</h1>
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
            <p>Especie: {mascota.especie}</p>
            <p>Raza: {mascota.raza || 'N/A'}</p>
          </div>
        ))}
        <GeneratePDFButton />
      </div>
    </div>
  );
}

