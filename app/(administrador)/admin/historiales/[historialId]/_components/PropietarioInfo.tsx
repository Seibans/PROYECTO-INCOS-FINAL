// components/PropietarioInfo.tsx
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { UsuarioT } from '@/types';

interface PropietarioInfoProps {
    usuario: UsuarioT | null;
    mascotaId: number;
}

const PropietarioInfo: React.FC<PropietarioInfoProps> = ({ usuario, mascotaId }) => {
    const handleAgregarPropietario = () => {
        // Implementar lógica para abrir modal de selección de propietario
    };

    const handleCambiarPropietario = () => {
        // Implementar lógica para cambiar propietario
    };

    if (!usuario) {
        return (
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Propietario</h3>
                <p className="text-sm text-muted-foreground">No se ha asignado un propietario</p>
                <Button onClick={handleAgregarPropietario} className="w-full sm:w-auto">Agregar Propietario</Button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Datos del Propietario</h3>
            <p className="text-sm">Nombre: {usuario.name} {usuario.apellidoPat} {usuario.apellidoMat}</p>
            <p className="text-sm">Email: {usuario.email}</p>
            <p className="text-sm">Teléfono: {usuario.celular || 'No registrado'}</p>
            <Button onClick={handleCambiarPropietario} className="w-full sm:w-auto mt-2 bg-gradient">Cambiar Propietario</Button>
        </div>
    );
};

export default PropietarioInfo;