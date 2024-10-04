// actions/historiales.ts
"use server";
import { db } from "@/lib/db";
import { HistorialMedicoVistaT } from "@/types";
import { HistorialMedicoCompleto, TratamientoCompleto } from "@/types";
import { RolUsuario } from "@prisma/client";


export const obtenerTodosHistorialesConMascotas = async (): Promise<{ historiales: HistorialMedicoVistaT[] } | { error: string }> => {
  try {
    const historiales = await db.historialMedico.findMany({
      include: {
        mascota: {
          select: {
            nombre: true,
            sexo: true,
            imagen: true,
            especie: true,
            raza: true,
          },
        },
        tratamientos: {
          select: {
            id: true,
            descripcion: true,
            creadoEn: true,
            actualizadoEn: true,
            idUsuario: true,
          },
        },
      },
    });

    // Ajustar la estructura para que coincida con HistorialMedicoVistaT
    const historialesConMascotas: HistorialMedicoVistaT[] = historiales.map(historial => ({
      id: historial.id,
      estado: historial.estado,
      creadoEn: historial.creadoEn,
      actualizadoEn: historial.actualizadoEn,
      nombreMascota: historial.mascota.nombre,
      imagenMascota: historial.mascota.imagen ?? null,
      especieMascota: historial.mascota.especie,
      razaMascota: historial.mascota.raza ?? null,
      sexoMascota: historial.mascota.sexo,
      tratamientos: historial.tratamientos.map(tratamiento => ({
        id: tratamiento.id,
        descripcion: tratamiento.descripcion,
        creadoEn: tratamiento.creadoEn,
        actualizadoEn: tratamiento.actualizadoEn,
        idUsuario: tratamiento.idUsuario,
      })),
    }));

    return { historiales: historialesConMascotas };
  } catch (error) {
    console.error("Error al obtener todos los historiales médicos:", error);
    return { error: "Ocurrió un error al obtener los historiales médicos." };
  }
};

export async function obtenerHistorialconMascotayUsuario(historialId: number): Promise<HistorialMedicoCompleto | null> {
  try {
    const historial = await db.historialMedico.findUnique({
      where: { id: historialId },
      include: {
        mascota: {
          include: {
            usuario: true
          }
        },
        tratamientos: {
          include: {
            servicios: true,
            medicamentos: {
              include: {
                medicamento: true
              }
            },
            pago: true
          }
        }
      }
    });

    if (!historial) {
      return null;
    }

    // Convertir los campos Decimal a string para que coincidan con las interfaces
    const historialFormateado: HistorialMedicoCompleto = {
      ...historial,
      mascota: {
        ...historial.mascota,
        usuario: historial.mascota.usuario ? {
          ...historial.mascota.usuario,
          rol: historial.mascota.usuario.rol as RolUsuario // Asegurarse de que el tipo sea correcto
        } : null
      },
      tratamientos: historial.tratamientos.map(tratamiento => ({
        ...tratamiento,
        servicios: tratamiento.servicios.map(servicio => ({
          ...servicio,
          precio: servicio.precio.toString()
        })),
        medicamentos: tratamiento.medicamentos.map(med => ({
          ...med,
          costoUnitario: med.costoUnitario.toNumber(),
          medicamento: {
            ...med.medicamento,
            precio: med.medicamento.precio.toString()
          }
        })),
        idPago: tratamiento.pagoId ?? 0 // Asumiendo que idPago es requerido en TratamientoT
      }))
    };

    return historialFormateado;
  } catch (error) {
    console.error("Error al obtener el historial médico:", error);
    throw new Error("Ocurrió un error al obtener el historial médico.");
  }
}


export async function obtenerTratamientoCompleto(tratamientoId: number): Promise<TratamientoCompleto | null> {
  try {
    const tratamiento = await db.tratamiento.findUnique({
      where: { id: tratamientoId },
      include: {
        servicios: true,
        medicamentos: {
          include: {
            medicamento: true
          }
        },
        pago: true
      }
    });

    if (!tratamiento) {
      return null;
    }

    // Convertir los campos Decimal a string para que coincidan con las interfaces
    const tratamientoFormateado: TratamientoCompleto = {
      ...tratamiento,
      servicios: tratamiento.servicios.map(servicio => ({
        ...servicio,
        precio: servicio.precio.toString()
      })),
      medicamentos: tratamiento.medicamentos.map(med => ({
        ...med,
        costoUnitario: med.costoUnitario.toNumber(),
        medicamento: {
          ...med.medicamento,
          precio: med.medicamento.precio.toString()
        }
      }))
    };

    return tratamientoFormateado;
  } catch (error) {
    console.error("Error al obtener el tratamiento:", error);
    throw new Error("Ocurrió un error al obtener el tratamiento.");
  }
}