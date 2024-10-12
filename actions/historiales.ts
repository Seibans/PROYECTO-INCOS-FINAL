// actions/historiales.ts
"use server";
import { db } from "@/lib/db";
import { HistorialMedicoCompleto, HistorialMedicoVistaT, TratamientoCompleto } from "@/types";

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
            estado: true,
            usuario: {
              select: {
                name: true,
                email: true,
                image: true,
                celular: true,
                direccion: true,
              },
            },
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

    const historialesConMascotas: HistorialMedicoVistaT[] = historiales.map(historial => ({
      historialMascotaId: historial.historialMascotaId,
      estado: historial.estado,
      creadoEn: historial.creadoEn,
      actualizadoEn: historial.actualizadoEn,
      nombreMascota: historial.mascota.nombre,
      imagenMascota: historial.mascota.imagen ?? null,
      especieMascota: historial.mascota.especie,
      razaMascota: historial.mascota.raza ?? null,
      sexoMascota: historial.mascota.sexo,
      estadoMascota: historial.mascota.estado,
      nombrePropietario: historial.mascota.usuario?.name ?? null,
      emailPropietario: historial.mascota.usuario?.email ?? null,
      imagenPropietario: historial.mascota.usuario?.image ?? null,
      celularPropietario: historial.mascota.usuario?.celular ?? null,
      direccionPropietario: historial.mascota.usuario?.direccion ?? null,
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
      where: { historialMascotaId: historialId },
      select: {
        historialMascotaId: true,
        descripcionTratamientos: true,
        estado: true,
        creadoEn: true,
        actualizadoEn: true,
        idUsuario: true,
        mascota: {
          select: {
            id: true,
            nombre: true,
            imagen: true,
            especie: true,
            raza: true,
            fechaNacimiento: true,
            sexo: true,
            detalles: true,
            peso: true,
            estado: true,
            idPropietario: true,
            esterilizado: true,
            creadoEn: true,
            actualizadoEn: true,
            idUsuario: true,
            usuario: {
              select: {
                id: true,
                name: true,
                apellidoPat: true,
                apellidoMat: true,
                ci: true,
                rol: true,
                sexo: true,
                email: true,
                emailVerified: true,
                image: true,
                celular: true,
                direccion: true,
                estado: true,
                authDobleFactor: true,
                createdAt: true,
                updatedAt: true,
                idUsuario: true,
              }
            }
          }
        },
        tratamientos: {
          select: {
            id: true,
            descripcion: true,
            estado: true,
            diagnostico: true,
            historialMascotaId: true,
            creadoEn: true,
            actualizadoEn: true,
            idUsuario: true,
            servicios: {
              select: {
                precioServicio: true,
                servicioId: true,
                servicio: {
                  select: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                    precio: true,
                    creadoEn: true,
                    actualizadoEn: true,
                    idUsuario: true,
                  }
                }
              }
            },
            medicamentos: {
              select: {
                cantidad: true,
                costoUnitario: true,
                dosificacion: true,
                medicamentoId: true,
                medicamento: {
                  select: {
                    id: true,
                    nombre: true,
                    imagen: true,
                    codigo: true,
                    descripcion: true,
                    indicaciones: true,
                    unidadMedida: true,
                    stock: true,
                    cantidadPorUnidad: true,
                    sobrante: true,
                    estado: true,
                    precio: true,
                    tipo: true,
                    creadoEn: true,
                    actualizadoEn: true,
                    idUsuario: true,
                  }
                }
              }
            },
            pago: {
              select: {
                id: true,
                total: true,
                fechaPago: true,
                detalle: true,
                estado: true,
                esAyudaVoluntaria: true,
              }
            }
          }
        }
      }
    });


    if (!historial) {
      return null;
    }

    // Convertir los campos Decimal a string para que coincidan con las interfaces
    const historialFormateado: any = {
      ...historial,
      mascota: {
        ...historial.mascota,
        usuario: historial.mascota.usuario ? {
          ...historial.mascota.usuario,
        } : null
      },
      tratamientos: historial.tratamientos.map(tratamiento => ({
        ...tratamiento,
        servicios: tratamiento.servicios.map(servicio => ({
          ...servicio,
          precioServicio: servicio.precioServicio.toNumber().toFixed(2),
          servicio: {
            ...servicio.servicio,
            precio: servicio.servicio.precio.toNumber().toFixed(2),
          }
        })),
        medicamentos: tratamiento.medicamentos.map(med => ({
          ...med,
          costoUnitario: med.costoUnitario.toNumber().toFixed(2),
          medicamento: {
            ...med.medicamento,
            precio: med.medicamento.precio.toNumber().toFixed(2)
          }
        })),
        pago: tratamiento.pago ? {
          ...tratamiento.pago,
          total: tratamiento.pago.total.toNumber().toFixed(2),
        } : null
      }))
    };

    return historialFormateado;
  } catch (error) {
    return null;
  }
}


export async function obtenerTratamientoCompleto(tratamientoId: number): Promise<TratamientoCompleto | null> {
  try {
    const tratamiento = await db.tratamiento.findUnique({
      where: { id: tratamientoId },
      include: {
        servicios: {
          include: {
            servicio: true
          }
        },
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
    
    console.log("DETALLADO COMPLETO", JSON.stringify(tratamiento, null, 2), "DETALLADO COMPLETO");


    // Convertir los campos Decimal a string para que coincidan con las interfaces
    const tratamientoFormateado: TratamientoCompleto = {
      ...tratamiento,
      servicios: tratamiento.servicios.map(servicio => ({
        ...servicio,
        precioServicio: servicio.precioServicio.toNumber().toFixed(2),
        servicio: {
          ...servicio.servicio,
          precio: servicio.servicio.precio.toNumber().toFixed(2)
        }
      })),
      medicamentos: tratamiento.medicamentos.map(med => ({
        ...med,
        costoUnitario: med.costoUnitario.toNumber().toFixed(2),
        medicamento: {
          ...med.medicamento,
          precio: med.medicamento.precio.toNumber().toFixed(2)
        }
      })),
      pago: null
    };
    console.log("DETALLADO COMPLETO", JSON.stringify(tratamientoFormateado, null, 2), "DETALLADO COMPLETO2");
    return tratamientoFormateado;
  } catch (error) {
    console.error("Error al obtener el tratamiento:", error);
    throw new Error("Ocurrió un error al obtener el tratamiento.");
  }
}