// 'use client'

// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { TratamientoT } from '@/types';
// import { useTratamientoStore } from '@/store/tratamientoStore';
// import { formatearFechaYHora } from '@/lib/formatearFecha';
// import { ArrowUp, ArrowDown, Search } from 'lucide-react';

// interface TratamientoListProps {
//     historialId: number;
//     tratamientoSeleccionado: number | null;
//     tratamientos: TratamientoT[];
// }

// export default function TratamientoList({ historialId, tratamientoSeleccionado, tratamientos }: TratamientoListProps) {
//     const [busqueda, setBusqueda] = useState('');
//     const [ordenAscendente, setOrdenAscendente] = useState(false);
//     const { setTratamiento } = useTratamientoStore();

//     let tratamientosFiltrados = tratamientos.filter(t =>
//         t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
//     );

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

//     const alternarOrden = () => {
//         setOrdenAscendente(!ordenAscendente);
//     };

//     return (
//         <Card className="w-full">
//             <CardHeader className="flex flex-col space-y-2">
//                 <div className="flex justify-between items-center xl:flex-col-reverse">
//                     <CardTitle 
//                         onClick={alternarOrden}
//                         className="flex items-center cursor-pointer hover:text-primary text-md xl:text-2xl">
//                         Tratamientos
//                         {ordenAscendente ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
//                     </CardTitle>
//                     <div className='flex items-center gap-2 xl:mb-4'>
//                         <Search className="h-4 w-4 flex-shrink-0" />
//                         <Input
//                             placeholder="Buscar tratamiento..."
//                             value={busqueda}
//                             onChange={(e) => setBusqueda(e.target.value)}
//                             className="w-full max-w-[200px]"
//                         />
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="p-0">
//                 <ScrollArea className="w-full h-full xl:h-[85dvh]">
//                     <div className="flex flex-row xl:flex-col">
//                         {tratamientosFiltrados.map((tratamiento, index) => {
//                             const numero = ordenAscendente ? index + 1 : tratamientosFiltrados.length - index;
//                             return (
//                                 <div
//                                     key={tratamiento.id}
//                                     className={`flex-shrink-0 w-64 md:w-auto p-4 m-2 rounded cursor-pointer ${
//                                         tratamiento.id === tratamientoSeleccionado 
//                                         ? 'bg-primary text-primary-foreground' 
//                                         : 'hover:bg-accent'
//                                     }`}
//                                     onClick={() => handleTratamientoClick(tratamiento.id)}
//                                 >
//                                     <h3 className="font-semibold truncate">{"# " + numero}. {tratamiento.descripcion}</h3>
//                                     <p className="text-sm">{formatearFechaYHora(tratamiento.creadoEn)}</p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     <ScrollBar orientation="horizontal" className="xl:hidden" />
//                     <ScrollBar orientation="vertical" className="hidden xl:block" />
//                 </ScrollArea>
//             </CardContent>
//         </Card>
//     );
// }




'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TratamientoT } from '@/types';
import { useTratamientoStore } from '@/store/tratamientoStore';
import { formatearFechaYHora } from '@/lib/formatearFecha';
import { ArrowUp, ArrowDown, Search, Edit, Trash2, CreditCard, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

interface TratamientoListProps {
    historialId: number;
    tratamientoSeleccionado: number | null;
    tratamientos: TratamientoT[];
}

export default function TratamientoList({ historialId, tratamientoSeleccionado, tratamientos }: TratamientoListProps) {
    const [busqueda, setBusqueda] = useState('');
    const [ordenAscendente, setOrdenAscendente] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState<string | null>(null);
    const [tratamientoAEliminar, setTratamientoAEliminar] = useState<number | null>(null);
    const [tratamientoDetalle, setTratamientoDetalle] = useState<TratamientoT | null>(null);
    const { setTratamiento } = useTratamientoStore();
    const router = useRouter();

    const tratamientosFiltrados = tratamientos.filter(t =>
        t.descripcion.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtroEstado === null || t.estado.toString() === filtroEstado)
    ).sort((a, b) => {
        if (ordenAscendente) {
            return new Date(a.creadoEn).getTime() - new Date(b.creadoEn).getTime();
        } else {
            return new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime();
        }
    });

    const handleTratamientoClick = async (id: number) => {
        const tratamientoSeleccionado = tratamientos.find(t => t.id === id);
        if (tratamientoSeleccionado) {
            //TODO: CORREGIR LA INTERFACE DE TRATAMIENTOT Y TRATAMIENTOFORMT
            // setTratamiento(tratamientoSeleccionado);
        }
    };

    const alternarOrden = () => {
        setOrdenAscendente(!ordenAscendente);
    };

    const handleEliminarTratamiento = (id: number) => {
        setTratamientoAEliminar(id);
    };

    const confirmarEliminarTratamiento = async () => {
        if (tratamientoAEliminar) {
            // Aquí iría la lógica para eliminar el tratamiento
            console.log(`Eliminando tratamiento ${tratamientoAEliminar}`);
            setTratamientoAEliminar(null);
        }
    };

    const handleVerPago = (id: number) => {
        router.push(`/admin/pagos/${id}`);
    };

    const handleMostrarDetalle = (tratamiento: TratamientoT) => {
        setTratamientoDetalle(tratamiento);
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
                <Select onValueChange={(value) => setFiltroEstado(value === 'todos' ? null : value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="0">Cancelado</SelectItem>
                        <SelectItem value="1">Nuevo</SelectItem>
                        <SelectItem value="2">Completado</SelectItem>
                        <SelectItem value="3">En Proceso</SelectItem>
                    </SelectContent>
                </Select>
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
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold truncate">{"# " + numero}. {tratamiento.descripcion}</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menú</span>
                                                    <Info className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleTratamientoClick(tratamiento.id)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Editar</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEliminarTratamiento(tratamiento.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Eliminar</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleVerPago(tratamiento.id)}>
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    <span>Ver Pago</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleMostrarDetalle(tratamiento)}>
                                                    <Info className="mr-2 h-4 w-4" />
                                                    <span>Mostrar Detalle</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm">{formatearFechaYHora(tratamiento.creadoEn)}</p>
                                    <p className="text-sm">Estado: {
                                        tratamiento.estado === 0 ? 'Cancelado' :
                                        tratamiento.estado === 1 ? 'Nuevo' :
                                        tratamiento.estado === 2 ? 'Completado' :
                                        tratamiento.estado === 3 ? 'En Proceso' : 'Desconocido'
                                    }</p>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" className="xl:hidden" />
                    <ScrollBar orientation="vertical" className="hidden xl:block" />
                </ScrollArea>
            </CardContent>

            <AlertDialog open={!!tratamientoAEliminar} onOpenChange={() => setTratamientoAEliminar(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro de eliminar este tratamiento?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el tratamiento y todos los datos asociados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmarEliminarTratamiento}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={!!tratamientoDetalle} onOpenChange={() => setTratamientoDetalle(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalle del Tratamiento</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {tratamientoDetalle && (
                            <div className="space-y-2">
                                <p><strong>ID:</strong> {tratamientoDetalle.id}</p>
                                <p><strong>Descripción:</strong> {tratamientoDetalle.descripcion}</p>
                                <p><strong>Estado:</strong> {
                                    tratamientoDetalle.estado === 0 ? 'Cancelado' :
                                    tratamientoDetalle.estado === 1 ? 'Nuevo' :
                                    tratamientoDetalle.estado === 2 ? 'Completado' :
                                    tratamientoDetalle.estado === 3 ? 'En Proceso' : 'Desconocido'
                                }</p>
                                <p><strong>Diagnóstico:</strong> {tratamientoDetalle.diagnostico || 'No especificado'}</p>
                                <p><strong>Creado:</strong> {formatearFechaYHora(tratamientoDetalle.creadoEn)}</p>
                                {tratamientoDetalle.actualizadoEn && (
                                    <p><strong>Actualizado:</strong> {formatearFechaYHora(tratamientoDetalle.actualizadoEn)}</p>
                                )}
                            </div>
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
