"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TratamientoT } from '@/types';
import { obtenerTratamientos } from '@/actions/tratamiento';

interface TratamientoListProps {
    historialId: number;
    tratamientoSeleccionado: number | null;
}

const TratamientoList: React.FC<TratamientoListProps> = ({ historialId, tratamientoSeleccionado }) => {
    const [tratamientos, setTratamientos] = useState<TratamientoT[]>([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const cargarTratamientos = async () => {
            
        };
        cargarTratamientos();
    }, [historialId]);

    const tratamientosFiltrados = tratamientos.filter(t => 
        t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tratamientos</CardTitle>
                <Input
                    placeholder="Buscar tratamiento..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px]">
                    {tratamientosFiltrados.map((tratamiento) => (
                        <div
                            key={tratamiento.id}
                            className={`p-2 mb-2 rounded ${tratamiento.id === tratamientoSeleccionado ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                        >
                            <h3 className="font-semibold">{tratamiento.descripcion}</h3>
                            <p className="text-sm">{new Date(tratamiento.creadoEn).toLocaleDateString()}</p>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default TratamientoList;