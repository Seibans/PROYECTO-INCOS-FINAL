// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import TratamientoList from './TratamientoList'
// import TratamientoForm from './TratamientoForm'
// import { useTratamientoStore } from '@/store/tratamientoStore'

// export default function HistorialMedicoView({ historial, tratamientoSeleccionado }) {
// 	const router = useRouter()
// 	const [busqueda, setBusqueda] = useState('')
// 	const { setTratamiento } = useTratamientoStore()

// 	const handleTratamientoSelect = (tratamiento) => {
// 		setTratamiento(tratamiento)
// 		router.push(`/admin/historiales/${historial.id}?idTratamiento=${tratamiento.id}`)
// 	}

// 	const handleNuevoTratamiento = () => {
// 		setTratamiento(null)
// 		router.push(`/admin/historiales/${historial.id}`)
// 	}

// 	return (
// 		<div className="container mx-auto p-4">


// 			<h1 className="text-3xl font-bold mb-6">Historial #{historial.id}</h1>
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Información de la Mascota</CardTitle>
// 				</CardHeader>
// 				<CardContent>
// 					<div className="flex items-center space-x-4 mb-4">
// 						<Avatar>
// 							<AvatarImage src={historial.mascota.imagen || '/placeholder.svg'} alt={historial.mascota.nombre} />
// 							<AvatarFallback>{historial.mascota.nombre[0]}</AvatarFallback>
// 						</Avatar>
// 						<div>
// 							<h2 className="text-xl font-semibold">{historial.mascota.nombre}</h2>
// 							<p className="text-sm text-muted-foreground">{historial.mascota.especie} - {historial.mascota.raza}</p>
// 						</div>
// 					</div>
// 					<div className='flex justify-end'>
// 					<Button onClick={handleNuevoTratamiento}>Agregar Tratamiento</Button>
// 					</div>
// 				</CardContent>
// 			</Card>
// 			<div className="flex gap-4 mt-4">
// 				<Card className='w-4/12'>
// 					<CardHeader>
// 						<CardTitle className="flex justify-between items-center">
// 							<span>Tratamientos</span>
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<Input
// 							type="text"
// 							placeholder="Buscar tratamiento..."
// 							value={busqueda}
// 							onChange={(e) => setBusqueda(e.target.value)}
// 							className="mb-4"
// 						/>
// 						<ScrollArea className="h-[300px]">
// 							<TratamientoList
// 								tratamientos={historial.tratamientos}
// 								busqueda={busqueda}
// 								onSelect={handleTratamientoSelect}
// 							/>
// 						</ScrollArea>
// 					</CardContent>
// 				</Card>
// 				<Card className="w-8/12">
// 					<CardHeader>
// 						<CardTitle>{tratamientoSeleccionado ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<TratamientoForm
// 							historialId={historial.id}
// 							tratamientoInicial={tratamientoSeleccionado}
// 						/>
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</div>
// 	)
// }





// components/HistorialMedicoView.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HistorialMedicoT, MascotaT, UsuarioT } from '@/types';
import TratamientoList from './TratamientoList';
import TratamientoForm from './TratamientoForm';

interface HistorialMedicoViewProps {
    historial: HistorialMedicoT;
    tratamientoSeleccionado: number | null;
}

// const HistorialMedicoView: React.FC<HistorialMedicoViewProps> = ({ historial, propietario, tratamientoSeleccionado }) => {
	const HistorialMedicoView: React.FC<HistorialMedicoViewProps> = ({ historial, tratamientoSeleccionado }) => {
    return (
        <div className="mx-auto p-4 w-full">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Información de la Mascota</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={historial.mascota.imagen || '/placeholder.svg'} alt={historial.mascota.nombre} />
                            <AvatarFallback>{historial.mascota.nombre[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{historial.mascota.nombre}</h2>
                            <p className="text-sm text-muted-foreground">{historial.mascota.especie} - {historial.mascota.raza}</p>
                        </div>
                    </div>

                    {/* ACA DEBO MOSTRAR EL USUARIO QUE ESTA RELACIONADO A LA MASCOTA, QUE PODRIA SER NULL , SI ES EL CASO DE QUE SEA NULL DEBE HABER UN BOTON DE AGREGAR PROPIETARIO, SOLO EL BOTON DE MOMENTO */}
                </CardContent>
            </Card>
            <div className="flex gap-4">
                <div className="w-2/12">
                    <TratamientoList historialId={historial.id} tratamientoSeleccionado={tratamientoSeleccionado} />
                </div>
                <div className="w-10/12">
                    <TratamientoForm historialId={historial.id} tratamientoId={tratamientoSeleccionado} />
                </div>
            </div>
        </div>
    );
};

export default HistorialMedicoView;