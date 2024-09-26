// app/report/page.tsx
import { db } from '@/lib/db';
import GeneratePDFButton from './_components/boton';

export default async function Report() {
  const mascotas = await db.mascota.findMany({
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reporte de Mascotas</h1>
      {mascotas.map((mascota) => (
        <div key={mascota.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
          <p>Especie: {mascota.especie}</p>
          <p>Raza: {mascota.raza || 'N/A'}</p>
          {/* Añade más detalles aquí */}
        </div>
      ))}
      
      {/* Botón para generar el PDF */}
      <GeneratePDFButton />
    </div>
  );
}

