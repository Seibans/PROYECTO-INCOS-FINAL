// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { TratamientoT } from '@/types';
// import { useTratamientoStore } from '@/store/tratamientoStore';
// import { formatearFechaYHora } from '@/lib/formatearFecha';
// import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react'; // Importa los iconos

// interface TratamientoListProps {
//     historialId: number;
//     tratamientoSeleccionado: number | null;
//     tratamientos: TratamientoT[];
// }

// const TratamientoList: React.FC<TratamientoListProps> = ({ historialId, tratamientoSeleccionado, tratamientos }) => {
//     const [busqueda, setBusqueda] = useState('');
//     const [ordenAscendente, setOrdenAscendente] = useState(false); // Estado para controlar el orden asc/desc
//     const { setTratamiento } = useTratamientoStore();

//     // Filtro basado en la búsqueda
//     let tratamientosFiltrados = tratamientos.filter(t =>
//         t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
//     );

//     // Ordenar por fecha de creación
//     tratamientosFiltrados = tratamientosFiltrados.sort((a, b) => {
//         if (ordenAscendente) {
//             return new Date(a.creadoEn).getTime() - new Date(b.creadoEn).getTime();
//         } else {
//             return new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime();
//         }
//     });

//     const handleTratamientoClick = async (id: number) => {
//         // Lógica para manejar el click en un tratamiento
//     };

//     // Función para alternar el orden
//     const alternarOrden = () => {
//         setOrdenAscendente(!ordenAscendente); // Alterna entre ascendente y descendente
//     };

//     return (
//         <Card>
//             <CardHeader className="flex justify-between items-center">
//                 <CardTitle 
//                     onClick={alternarOrden} // Cambia el orden cuando haces click en el título
//                     className="flex items-center cursor-pointer hover:text-primary">
//                     Tratamientos
//                     {/* Icono que cambia según el estado del orden */}
//                     {ordenAscendente ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
//                 </CardTitle>
//                 <div className='flex gap-3'>
//                 <Search className="h-4 w-4" />
//                 <Input
//                     placeholder="Buscar tratamiento..."
//                     value={busqueda}
//                     onChange={(e) => setBusqueda(e.target.value)}
//                     />
//                     </div>
//             </CardHeader>
//             <CardContent>
//                 <ScrollArea className="h-[85dvh]">
//                     {tratamientosFiltrados.map((tratamiento, index) => {
//                         // El índice se calcula de forma inversa cuando el orden es descendente
//                         const numero = ordenAscendente ? index + 1 : tratamientosFiltrados.length - index;

//                         return (
//                             <div
//                                 key={tratamiento.id}
//                                 className={`p-2 mb-2 rounded cursor-pointer ${tratamiento.id === tratamientoSeleccionado ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
//                                 onClick={() => handleTratamientoClick(tratamiento.id)}
//                             >
//                                 {/* Muestra el número y la descripción del tratamiento */}
//                                 <h3 className="font-semibold">{"# " + numero}. {tratamiento.descripcion}</h3>
//                                 <p className="text-sm">{formatearFechaYHora(tratamiento.creadoEn)}</p>
//                             </div>
//                         );
//                     })}
//                 </ScrollArea>
//             </CardContent>
//         </Card>
//     );
// };

// export default TratamientoList;








'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TratamientoT } from '@/types';
import { useTratamientoStore } from '@/store/tratamientoStore';
import { formatearFechaYHora } from '@/lib/formatearFecha';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';

interface TratamientoListProps {
    historialId: number;
    tratamientoSeleccionado: number | null;
    tratamientos: TratamientoT[];
}

export default function TratamientoList({ historialId, tratamientoSeleccionado, tratamientos }: TratamientoListProps) {
    const [busqueda, setBusqueda] = useState('');
    const [ordenAscendente, setOrdenAscendente] = useState(false);
    const { setTratamiento } = useTratamientoStore();

    let tratamientosFiltrados = tratamientos.filter(t =>
        t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    tratamientosFiltrados = tratamientosFiltrados.sort((a, b) => {
        if (ordenAscendente) {
            return new Date(a.creadoEn).getTime() - new Date(b.creadoEn).getTime();
        } else {
            return new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime();
        }
    });

    const handleTratamientoClick = async (id: number) => {
        // Lógica para manejar el click en un tratamiento
    };

    const alternarOrden = () => {
        setOrdenAscendente(!ordenAscendente);
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col space-y-2">
                <div className="flex justify-between items-center xl:flex-col-reverse">
                    <CardTitle 
                        onClick={alternarOrden}
                        className="flex items-center cursor-pointer hover:text-primary text-md xl:text-2xl">
                        Tratamientos
                        {ordenAscendente ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
                    </CardTitle>
                    <div className='flex items-center gap-2 xl:mb-4'>
                        <Search className="h-4 w-4 flex-shrink-0" />
                        <Input
                            placeholder="Buscar tratamiento..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full max-w-[200px]"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="w-full h-full xl:h-[85dvh]">
                    <div className="flex flex-row xl:flex-col">
                        {tratamientosFiltrados.map((tratamiento, index) => {
                            const numero = ordenAscendente ? index + 1 : tratamientosFiltrados.length - index;
                            return (
                                <div
                                    key={tratamiento.id}
                                    className={`flex-shrink-0 w-64 md:w-auto p-4 m-2 rounded cursor-pointer ${
                                        tratamiento.id === tratamientoSeleccionado 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'hover:bg-accent'
                                    }`}
                                    onClick={() => handleTratamientoClick(tratamiento.id)}
                                >
                                    <h3 className="font-semibold truncate">{"# " + numero}. {tratamiento.descripcion}</h3>
                                    <p className="text-sm">{formatearFechaYHora(tratamiento.creadoEn)}</p>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" className="xl:hidden" />
                    <ScrollBar orientation="vertical" className="hidden xl:block" />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}