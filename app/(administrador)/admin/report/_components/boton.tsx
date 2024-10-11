"use client";
import { generatePDFFromURL } from '@/actions/pdf';
import { useState } from 'react'
import { Content } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"


async function generatePDF() {
  const pdfPath = await generatePDFFromURL(`https://psicologiaymente.com/miscelanea/animales-compania-mas-populares`);
  return pdfPath;
}

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
  const [isLoading, setIsLoading] = useState(false);
  // const handleClick = async () => {
  //   // const pdfPath = await handleGeneratePDF();
  //   const pdfPath = await generatePDF();
  //   window.open(pdfPath);
  // };
  const { toast } = useToast()

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const pdfPath = await generatePDF();
      window.open(pdfPath);
      toast({
        title: "PDF generado con éxito",
        description: "El PDF se ha generado y abierto en una nueva pestaña.",
      });
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast({
        title: "Error al generar el PDF",
        description: "Por favor, inténtelo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Generando PDF...' : 'Generar PDF'}
    </Button>
  );
}