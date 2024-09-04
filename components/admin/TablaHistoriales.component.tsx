// "use client"
// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Search, Calendar, Syringe, ChevronLeft, ChevronRight } from 'lucide-react'

// type Tratamiento = {
//   id: string;
//   fecha: string;
//   descripcion: string;
//   medicamentos: string[];
// }

// type Mascota = {
//   id: string;
//   nombre: string;
//   especie: string;
//   raza: string;
//   imagen: string;
//   tratamientos: Tratamiento[];
// }

// // Simulamos una función para obtener mascotas de una API
// const obtenerMascotas = (pagina: number, busqueda: string): Promise<{ mascotas: Mascota[], total: number }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const totalMascotas = 50; // Total simulado de mascotas
//       const mascotasPorPagina = 12;
//       const inicio = (pagina - 1) * mascotasPorPagina;  
//       const fin = Math.min(inicio + mascotasPorPagina, totalMascotas);
//       const mascotas: Mascota[] = Array.from({ length: fin - inicio }, (_, i) => ({
//         id: `${pagina}-${i}`,
//         nombre: `Mascota ${inicio + i + 1}`,
//         especie: Math.random() > 0.5 ? 'Perro' : 'Gato',
//         raza: 'Raza mixta',
//         imagen: `/placeholder.svg?height=40&width=40`,
//         tratamientos: [
//           {
//             id: `t-${pagina}-${i}`,
//             fecha: '2023-08-01',
//             descripcion: 'Chequeo general',
//             medicamentos: ['Vitaminas', 'Desparasitante']
//           }
//         ]
//       }));
//       resolve({
//         mascotas: mascotas.filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase())),
//         total: totalMascotas
//       });
//     }, 500);
//   });
// };

// export function TablaHistoriales() {
//   const [mascotas, setMascotas] = useState<Mascota[]>([]);
//   const [pagina, setPagina] = useState(1);
//   const [totalPaginas, setTotalPaginas] = useState(1);
//   const [cargando, setCargando] = useState(false);
//   const [busqueda, setBusqueda] = useState('');
//   const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null);

//   const cargarMascotas = async () => {
//     if (cargando) return;
//     setCargando(true);
//     const { mascotas: nuevasMascotas, total } = await obtenerMascotas(pagina, busqueda);
//     setMascotas(nuevasMascotas);
//     setTotalPaginas(Math.ceil(total / 12)); // Asumiendo 12 mascotas por página
//     setCargando(false);
//   };

//   useEffect(() => {
//     cargarMascotas();
//   }, [pagina, busqueda]);

//   const handleBusqueda = () => {
//     setPagina(1);
//     cargarMascotas();
//   };

//   const cambiarPagina = (nuevaPagina: number) => {
//     setPagina(nuevaPagina);
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Historial Médico de Mascotas</h1>
//       <div className="flex items-center space-x-2 mb-6">
//         <Input
//           type="text"
//           placeholder="Buscar mascota..."
//           value={busqueda}
//           onChange={(e) => setBusqueda(e.target.value)}
//           className="flex-grow"
//         />
//         <Button onClick={handleBusqueda}>
//           <Search className="h-4 w-4 mr-2" />
//           Buscar
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {mascotas.map((mascota) => (
//           <Card key={mascota.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-4 mb-4">
//                 <Avatar>
//                   <AvatarImage src={mascota.imagen} alt={mascota.nombre} />
//                   <AvatarFallback>{mascota.nombre[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
//                   <p className="text-sm text-muted-foreground">{mascota.especie} - {mascota.raza}</p>
//                 </div>
//               </div>
//               <Badge variant="secondary" className="mb-2">
//                 {mascota.tratamientos.length} tratamiento(s)
//               </Badge>
//             </CardContent>
//             <CardFooter>
//               <Button onClick={() => setMascotaSeleccionada(mascota)} className="w-full">
//                 Ver detalles
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       {cargando && <p className="text-center mt-4">Cargando mascotas...</p>}
//       <div className="flex justify-center items-center space-x-2 mt-6">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => cambiarPagina(Math.max(1, pagina - 1))}
//           disabled={pagina === 1}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <span>
//           Página {pagina} de {totalPaginas}
//         </span>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => cambiarPagina(Math.min(totalPaginas, pagina + 1))}
//           disabled={pagina === totalPaginas}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//       <Dialog open={!!mascotaSeleccionada} onOpenChange={() => setMascotaSeleccionada(null)}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{mascotaSeleccionada?.nombre}</DialogTitle>
//             <DialogDescription>
//               {mascotaSeleccionada?.especie} - {mascotaSeleccionada?.raza}
//             </DialogDescription>
//           </DialogHeader>
//           <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//             <Accordion type="single" collapsible className="w-full">
//               {mascotaSeleccionada?.tratamientos.map((tratamiento) => (
//                 <AccordionItem key={tratamiento.id} value={tratamiento.id}>
//                   <AccordionTrigger>
//                     <span className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       {tratamiento.fecha}
//                     </span>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <p className="mb-2">{tratamiento.descripcion}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {tratamiento.medicamentos.map((med, index) => (
//                         <Badge key={index} variant="outline">
//                           <Syringe className="h-3 w-3 mr-1" />
//                           {med}
//                         </Badge>
//                       ))}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </ScrollArea>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

"use client"
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Calendar, Syringe, ChevronLeft, ChevronRight } from 'lucide-react';
import { HistorialMedicoT } from "@/types"; // Importa la interfaz correcta

// Define las props para el componente, esperando recibir los historiales médicos
interface TablaHistorialesProps {
  data: HistorialMedicoT[];
}

export function TablaHistoriales({ data }: TablaHistorialesProps) {
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(Math.ceil(data.length / 12)); // Ajusta según los datos recibidos
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<HistorialMedicoT | null>(null);

  // Filtra los datos según la búsqueda
  const filteredData = data.filter((historial) =>
    historial.nombreMascota.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación de los datos
  const mascotasPorPagina = 12;
  const inicio = (pagina - 1) * mascotasPorPagina;
  const fin = Math.min(inicio + mascotasPorPagina, filteredData.length);
  const mascotas = filteredData.slice(inicio, fin);

  const handleBusqueda = () => {
    setPagina(1);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    setPagina(nuevaPagina);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Historial Médico de Mascotas</h1>
      <div className="flex items-center space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Buscar mascota..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleBusqueda}>
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mascotas.map((historial) => (
          <Card key={historial.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={historial.imagenMascota || '/placeholder.svg'} alt={historial.nombreMascota} />
                  <AvatarFallback>{historial.nombreMascota[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{historial.nombreMascota}</h2>
                  <p className="text-sm text-muted-foreground">{historial.especieMascota} - {historial.razaMascota}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mb-2">
                {historial.tratamientos.length} tratamiento(s)
              </Badge>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setMascotaSeleccionada(historial)} className="w-full">
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {cargando && <p className="text-center mt-4">Cargando historiales...</p>}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => cambiarPagina(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => cambiarPagina(Math.min(totalPaginas, pagina + 1))}
          disabled={pagina === totalPaginas}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Dialog open={!!mascotaSeleccionada} onOpenChange={() => setMascotaSeleccionada(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{mascotaSeleccionada?.nombreMascota}</DialogTitle>
            <DialogDescription>
              {mascotaSeleccionada?.especieMascota} - {mascotaSeleccionada?.razaMascota}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              {mascotaSeleccionada?.tratamientos.map((tratamiento) => (
                <AccordionItem key={tratamiento.id} value={tratamiento.id.toString()}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(tratamiento.creadoEn).toLocaleDateString()}
                      {/* Usa el campo de fecha correcto */}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">{tratamiento.descripcion}</p>
                    <Badge variant="outline">{`Precio: ${tratamiento.precio} €`}</Badge>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
