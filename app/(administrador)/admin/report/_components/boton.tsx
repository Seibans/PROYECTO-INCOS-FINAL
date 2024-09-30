"use client";
import { generatePDFFromURL } from '@/actions/pdf';
// Manejo del evento para generar el PDF LA RUTA API ESTA MAL
// async function handleGeneratePDF() {
//   const response = await fetch('http://localhost:3000/api/auth', {
//     method: 'POST'
//   });

//   if (response.ok) {
//     const data = await response.json();
//     window.open(data.pdfPath);
//   } else {
//     console.error('Error al generar el PDF');
//   }
// }


export default function GeneratePDFButton() {


  const handleClick = async () => {
    // const pdfPath = await handleGeneratePDF();
    const pdfPath = await generatePDFFromURL(`http://localhost:3000`);
    console.log(pdfPath);
    window.open(pdfPath);
  };

  return (
    <button onClick={handleClick} className="mt-4 p-2 bg-blue-500 text-white rounded">
      Generar PDF
    </button>
  );
}