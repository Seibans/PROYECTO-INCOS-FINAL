"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HistorialMedicoCompleto, MedicamentoT, ServicioT, TratamientoCompleto, TratamientoT } from '@/types';
import TratamientoList from './TratamientoList';
import TratamientoForm from './TratamientoForm';
import PropietarioInfo from './PropietarioInfo';

interface HistorialMedicoViewProps {
    historial: HistorialMedicoCompleto;
    tratamiento: TratamientoCompleto | null;
    servicios: ServicioT[];
    medicamentos: MedicamentoT[];
}

const HistorialMedicoView: React.FC<HistorialMedicoViewProps> = ({ historial, tratamiento, servicios, medicamentos }) => {
    const tratamientos = historial.tratamientos;
    return (
        <div className="mx-auto p-4 w-full">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Información del Historial Médico</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Datos del Historial</h3>
                        <p>ID: {historial.historialMascotaId}</p>
                        <p>Estado: {historial.estado}</p>
                        <p>Creado: {new Date(historial.creadoEn).toLocaleDateString()}</p>
                        {historial.actualizadoEn && (
                            <p>Actualizado: {new Date(historial.actualizadoEn).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Datos de la Mascota</h3>
                        <div className="flex items-center space-x-4 mb-2">
                            <Avatar>
                                <AvatarImage src={historial.mascota.imagen || '/placeholder.svg'} alt={historial.mascota.nombre} />
                                <AvatarFallback>{historial.mascota.nombre[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{historial.mascota.nombre}</p>
                                <p className="text-sm text-muted-foreground">{historial.mascota.especie} - {historial.mascota.raza || 'No especificada'}</p>
                            </div>
                        </div>
                        <p>Sexo: {historial.mascota.sexo}</p>
                        <p>Peso: {historial.mascota.peso ? `${historial.mascota.peso} kg` : 'No registrado'}</p>
                        <p>Esterilizado: {historial.mascota.esterilizado ? 'Sí' : 'No'}</p>
                    </div>
                    <PropietarioInfo usuario={historial.mascota.usuario} mascotaId={historial.mascota.id} />
                </CardContent>
            </Card>
            <div className="flex flex-col xl:flex-row gap-2">
                <div className="w-full xl:w-2/12">
                    <TratamientoList
                        historialId={historial.historialMascotaId}
                        tratamientoSeleccionado={tratamiento?.id || null}
                        tratamientos={tratamientos}
                    />

                </div>
                <div className="w-full xl:w-10/12">
                    <TratamientoForm
                        historialId={historial.historialMascotaId}
                        tratamiento={tratamiento}
                        medicamentos={medicamentos}
                        servicios={servicios}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistorialMedicoView;