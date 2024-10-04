import { db } from "@/lib/db";
import { TratamientoT } from '@/types';

export async function obtenerTratamientos(historialId: number) {
    const tratamientos = await db.tratamiento.findMany({
        where: { historialMedicoId: historialId },
        include: {
            medicamentos: {
                include: { medicamento: true }
            },
            servicios: true
        }
    });
    return tratamientos;
}

export async function obtenerTratamiento(historialId: number, tratamientoId: number) {
    const tratamiento = await db.tratamiento.findFirst({
        where: {
            id: tratamientoId,
            historialMedicoId: historialId
        },
        include: {
            medicamentos: {
                include: { medicamento: true }
            },
            servicios: true
        }
    });
    return tratamiento;
}

export async function crearTratamiento(historialId: number, data: TratamientoT) {
}

export async function actualizarTratamiento(historialId: number, tratamientoId: number, data: TratamientoT) {
}