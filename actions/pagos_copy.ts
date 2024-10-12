// File: @/actions/pagos.ts
"use server"
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';

import { PagoResumen2, TratamientoCompletoP, ResumenIngresos } from '@/types/pablo';

export const obtenerPagos = async (): Promise<PagoResumen2[]> => {
  try {
    const pagos = await prisma.pago.findMany({
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
        actualizadoEn: true,
        tratamiento: {
          select: {
            id: true,
            descripcion: true,
            estado: true,
            historialMascota: {
              select: {
                mascota: {
                  select: {
                    id: true,
                    nombre: true,
                    usuario: {
                      select: {
                        id: true,
                        name: true,
                        apellidoPat: true,
                        apellidoMat: true,
                        email: true,
                        rol: true,
                        celular: true,
                        estado: true,
                      }
                    }
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

    const pagosFormateados: PagoResumen2[] = pagos.map(pago => ({
        id: pago.id,
        total: new Decimal(pago.total).toNumber().toFixed(2),
        fechaPago: pago.fechaPago ? pago.fechaPago : null,
        estado: pago.estado,
        detalle: pago.detalle,
        creadoEn: pago.creadoEn,
        actualizadoEn: pago.actualizadoEn ? pago.actualizadoEn : null,
        descripcionTratamiento: pago.tratamiento?.descripcion ?? null,
        estadoTratamiento: pago.tratamiento?.estado ?? null,
        idMascota: pago.tratamiento?.historialMascota?.mascota?.id ?? null,
        nombreMascota: pago.tratamiento?.historialMascota?.mascota?.nombre ?? null,
        idUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario?.id ?? null,
        nombreCompletoUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario
          ? `${pago.tratamiento.historialMascota.mascota.usuario.name} ${pago.tratamiento.historialMascota.mascota.usuario.apellidoPat}${pago.tratamiento.historialMascota.mascota.usuario.apellidoMat ? ' ' + pago.tratamiento.historialMascota.mascota.usuario.apellidoMat : ''}`.trim()
          : null,
        emailUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario?.email ?? null,
        celularUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario?.celular ?? null,
        rolUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario?.rol ?? null,
        estadoUsuario: pago.tratamiento?.historialMascota?.mascota?.usuario?.estado ?? null,
      }));

    // console.log("DETALLADO COMPLETO", JSON.stringify(pagosFormateados, null, 2), "DETALLADO COMPLETO");

    return pagosFormateados;
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return [];
  }
}

// Server Actions
export async function obtenerTratamientoCompleto(tratamientoId: number): Promise<TratamientoCompletoP | null> {
  try {
    const tratamiento = await prisma.tratamiento.findUnique({
      where: { id: tratamientoId },
      include: {
        pago: true,
        servicios: {
          include: { servicio: true }
        },
        medicamentos: {
          include: { medicamento: true }
        },
        historialMascota: true
      }
    });

    console.log("DETALLADO COMPLETO", JSON.stringify(tratamiento, null, 2), "DETALLADO COMPLETO");


    if (!tratamiento) return null;

    const servicios = tratamiento.servicios.map(st => ({
      idServicio: st.servicioId,
      precioServicio: st.precioServicio.toFixed(2),
      nombreServicio: st.servicio.nombre
    }));

    const medicamentos = tratamiento.medicamentos.map(tm => ({
      idMedicamento: tm.medicamentoId,
      costoUnitario: tm.costoUnitario.toFixed(2),
      cantidad: tm.cantidad,
      dosificacion: tm.dosificacion,
      totalMedicamento: (tm.costoUnitario.toNumber() * tm.cantidad).toFixed(2),
      nombreMedicamento: tm.medicamento.nombre,
      codigoMedicamento: tm.medicamento.codigo,
      cantidadPorUnidad: tm.medicamento.cantidadPorUnidad,
      unidadMedida: tm.medicamento.unidadMedida
    }));

    const sumaTotalPrecioServicio = servicios.reduce((sum, s) => sum + parseFloat(s.precioServicio), 0).toFixed(2);
    const costoTotalMedicamentos = medicamentos.reduce((sum, m) => sum + parseFloat(m.totalMedicamento), 0).toFixed(2);

    return {
      id: tratamiento.id,
      descripcion: tratamiento.descripcion,
      estado: tratamiento.estado,
      diagnostico: tratamiento.diagnostico,
      idHistorial: tratamiento.historialMascotaId,
      totalPago: tratamiento.pago?.total.toFixed(2) || null,
      estadoPago: tratamiento.pago?.estado || null,
      creadoEn: tratamiento.creadoEn,
      actualizadoEn: tratamiento.actualizadoEn,
      idUsuario: tratamiento.idUsuario,
      servicios,
      medicamentos,
      sumaTotalPrecioServicio,
      costoTotalMedicamentos
    };
  } catch (error) {
    console.error("Error al obtener el tratamiento completo:", error);
    return null;
  }
}

export async function obtenerResumenIngresos(): Promise<ResumenIngresos> {
  try {
    const ahora = new Date();
    const inicioSemana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - ahora.getDay());
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

    const [ingresoSemanal, ingresoMensual] = await Promise.all([
      prisma.pago.aggregate({
        _sum: {
          total: true
        },
        where: {
          estado: { not: 0 },
          actualizadoEn: {
            gte: inicioSemana
          }
        }
      }),
      prisma.pago.aggregate({
        _sum: {
          total: true
        },
        where: {
          estado: { not: 0 },
          actualizadoEn: {
            gte: inicioMes
          }
        }
      })
    ]);

    return {
      ingresoSemanal: (ingresoSemanal._sum.total || new Prisma.Decimal(0)).toFixed(2),
      ingresoMensual: (ingresoMensual._sum.total || new Prisma.Decimal(0)).toFixed(2)
    };
  } catch (error) {
    console.error("Error al obtener el resumen de ingresos:", error);
    return {
      ingresoSemanal: "0.00",
      ingresoMensual: "0.00"
    };
  }
}