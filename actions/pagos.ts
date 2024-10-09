// File: @/actions/pagos.ts

import { db } from '@/lib/db';
import { PagoResumen, TratamientoDetallado, ResumenIngresos } from '@/types/pagos';
import { Prisma } from '@prisma/client';

export async function obtenerPagos(): Promise<{ success: boolean; pagos?: PagoResumen[]; error?: string }> {
  try {
    const pagos = await db.pago.findMany({
      where: {
        estado: {
          not: 0
        }
      },
      select: {
        id: true,
        total: true,
        fechaPago: true,
        estado: true,
        detalle: true,
        creadoEn: true,
        tratamiento: {
          select: {
            id: true,
            historialMascota: {
              select: {
                mascota: {
                  select: {
                    nombre: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        creadoEn: 'desc'
      }
    });

    const pagosFormateados: PagoResumen[] = pagos.map(pago => ({
      id: pago.id,
      total: pago.total,
      fechaPago: pago.fechaPago,
      estado: pago.estado,
      detalle: pago.detalle,
      creadoEn: pago.creadoEn,
      mascotaNombre: pago.tratamiento?.historialMascota.mascota.nombre || 'Desconocido',
      tratamientoId: pago.tratamiento?.id || 0
    }));

    return {
      success: true,
      pagos: pagosFormateados
    };
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return { success: false, error: "Ocurrió un error al obtener los pagos" };
  }
}

export async function obtenerTratamientoCompleto(tratamientoId: number): Promise<{ success: boolean; tratamiento?: TratamientoDetallado; error?: string }> {
  try {
    const tratamiento = await db.tratamiento.findUnique({
      where: { id: tratamientoId },
      include: {
        pago: true,
        historialMascota: {
          include: {
            mascota: {
              include: {
                usuario: true
              }
            }
          }
        },
        servicios: {
          include: {
            servicio: true
          }
        },
        medicamentos: {
          include: {
            medicamento: true
          }
        }
      }
    });

    if (!tratamiento) {
      return { success: false, error: "Tratamiento no encontrado" };
    }

    const tratamientoDetallado: TratamientoDetallado = {
      id: tratamiento.id,
      descripcion: tratamiento.descripcion,
      estado: tratamiento.estado,
      diagnostico: tratamiento.diagnostico,
      historialMascotaId: tratamiento.historialMascotaId,
      creadoEn: tratamiento.creadoEn,
      actualizadoEn: tratamiento.actualizadoEn,
      idUsuario: tratamiento.idUsuario,
      pago: tratamiento.pago!,
      mascota: {
        id: tratamiento.historialMascota.mascota.id,
        nombre: tratamiento.historialMascota.mascota.nombre,
        especie: tratamiento.historialMascota.mascota.especie,
        raza: tratamiento.historialMascota.mascota.raza,
        sexo: tratamiento.historialMascota.mascota.sexo,
        peso: tratamiento.historialMascota.mascota.peso,
      },
      propietario: tratamiento.historialMascota.mascota.usuario ? {
        id: tratamiento.historialMascota.mascota.usuario.id,
        name: tratamiento.historialMascota.mascota.usuario.name,
        apellidoPat: tratamiento.historialMascota.mascota.usuario.apellidoPat,
        apellidoMat: tratamiento.historialMascota.mascota.usuario.apellidoMat,
        email: tratamiento.historialMascota.mascota.usuario.email,
        rol: tratamiento.historialMascota.mascota.usuario.rol,
      } : null,
      servicios: tratamiento.servicios.map(st => ({
        id: st.servicio.id,
        nombre: st.servicio.nombre,
        precioServicio: st.precioServicio,
      })),
      medicamentos: tratamiento.medicamentos.map(tm => ({
        id: tm.medicamento.id,
        nombre: tm.medicamento.nombre,
        cantidad: tm.cantidad,
        costoUnitario: tm.costoUnitario,
      })),
    };

    return {
      success: true,
      tratamiento: tratamientoDetallado
    };
  } catch (error) {
    console.error("Error al obtener tratamiento completo:", error);
    return { success: false, error: "Ocurrió un error al obtener los detalles del tratamiento" };
  }
}

export async function obtenerResumenIngresos(): Promise<{ success: boolean; resumen?: ResumenIngresos; error?: string }> {
  try {
    const ahora = new Date();
    const inicioSemana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 7);
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

    const [totalSemanal, totalMensual] = await Promise.all([
      db.pago.aggregate({
        _sum: {
          total: true
        },
        where: {
          estado: 3,
          fechaPago: {
            gte: inicioSemana
          }
        }
      }),
      db.pago.aggregate({
        _sum: {
          total: true
        },
        where: {
          estado: 3,
          fechaPago: {
            gte: inicioMes
          }
        }
      })
    ]);

    return {
      success: true,
      resumen: {
        totalSemanal: totalSemanal._sum.total || new Prisma.Decimal(0),
        totalMensual: totalMensual._sum.total || new Prisma.Decimal(0)
      }
    };
  } catch (error) {
    console.error("Error al obtener resumen de ingresos:", error);
    return { success: false, error: "Ocurrió un error al obtener el resumen de ingresos" };
  }
}