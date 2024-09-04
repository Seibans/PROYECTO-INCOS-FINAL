// actions/historiales.ts
"use server";
import { db } from "@/lib/db";
import { HistorialMedicoT } from "@/types"; // Ajusta la ruta si es necesario

export const obtenerTodosHistorialesConMascotas = async (): Promise<{ historiales: HistorialMedicoT[] } | { error: string }> => {
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
            nombre: true,
            descripcion: true,
            precio: true,
            creadoEn: true,
            actualizadoEn: true,
            idUsuario: true,
          },
        },
      },
    });

    // Ajustar la estructura para que coincida exactamente con HistorialMedicoT
    const historialesConMascotas = historiales.map(historial => ({
      id: historial.id,
      estado: historial.estado,
      creadoEn: historial.creadoEn,
      actualizadoEn: historial.actualizadoEn,
      nombreMascota: historial.mascota.nombre,
      imagenMascota: historial.mascota.imagen,
      especieMascota: historial.mascota.especie,
      razaMascota: historial.mascota.raza,
      sexoMascota: historial.mascota.sexo,
      tratamientos: historial.tratamientos.map(tratamiento => ({
        id: tratamiento.id,
        nombre: tratamiento.nombre,
        descripcion: tratamiento.descripcion,
        precio: Number(tratamiento.precio), // Convertir Decimal a number
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
