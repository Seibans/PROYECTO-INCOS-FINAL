"use server"
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { PagoResumen, TratamientoCompleto, ResumenIngresos } from '@/types/pagos';

export const obtenerPagos = async (): Promise<PagoResumen[]> => {
  try {
    const pagos = await prisma.pago.findMany({
      where: {
        estado: {
          not: 0
        }
      },
      include: {
        tratamiento: {
          include: {
            historialMascota: {
              include: {
                mascota: {
                  include: {
                    usuario: true
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

    return pagos.map(pago => ({
      id: pago.id,
      total: pago.total.toNumber(),
      fechaPago: pago.fechaPago,
      estado: pago.estado,
      detalle: pago.detalle,
      creadoEn: pago.creadoEn,
      actualizadoEn: pago.actualizadoEn,
      tratamientoId: pago.tratamiento.id,
      tratamientoDescripcion: pago.tratamiento.descripcion,
      tratamientoEstado: pago.tratamiento.estado,
      mascotaNombre: pago.tratamiento.historialMascota.mascota.nombre,
      mascotaId: pago.tratamiento.historialMascota.mascota.id,
      usuarioNombreCompleto: pago.tratamiento.historialMascota.mascota.usuario
        ? `${pago.tratamiento.historialMascota.mascota.usuario.name} ${pago.tratamiento.historialMascota.mascota.usuario.apellidoPat || ''} ${pago.tratamiento.historialMascota.mascota.usuario.apellidoMat || ''}`.trim()
        : null,
      usuarioEmail: pago.tratamiento.historialMascota.mascota.usuario?.email || null,
      usuarioCelular: pago.tratamiento.historialMascota.mascota.usuario?.celular || null,
    }));
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return [];
  }
}

export const obtenerTratamientoCompleto = async (tratamientoId: number): Promise<TratamientoCompleto | null> => {
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
        historialMascota: {
          include: {
            mascota: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });

    if (!tratamiento) return null;

    const servicios = tratamiento.servicios.map(st => ({
      id: st.servicioId,
      nombre: st.servicio.nombre,
      precio: st.precioServicio.toNumber(),
    }));

    const medicamentos = tratamiento.medicamentos.map(tm => ({
      id: tm.medicamentoId,
      nombre: tm.medicamento.nombre,
      codigo: tm.medicamento.codigo,
      costoUnitario: tm.costoUnitario.toNumber(),
      cantidad: tm.cantidad,
      dosificacion: tm.dosificacion,
      total: tm.costoUnitario.toNumber() * tm.cantidad,
    }));

    const sumaTotalServicios = servicios.reduce((sum, s) => sum + s.precio, 0);
    const sumaTotalMedicamentos = medicamentos.reduce((sum, m) => sum + m.total, 0);

    return {
      id: tratamiento.id,
      descripcion: tratamiento.descripcion,
      estado: tratamiento.estado,
      diagnostico: tratamiento.diagnostico,
      fechaCreacion: tratamiento.creadoEn,
      fechaActualizacion: tratamiento.actualizadoEn,
      pago: tratamiento.pago ? {
        id: tratamiento.pago.id,
        total: tratamiento.pago.total.toNumber(),
        fechaPago: tratamiento.pago.fechaPago,
        metodoPago: tratamiento.pago.metodoPago,
        estado: tratamiento.pago.estado,
      } : null,
      servicios,
      medicamentos,
      sumaTotalServicios,
      sumaTotalMedicamentos,
      mascota: {
        id: tratamiento.historialMascota.mascota.id,
        nombre: tratamiento.historialMascota.mascota.nombre,
        especie: tratamiento.historialMascota.mascota.especie,
        raza: tratamiento.historialMascota.mascota.raza,
      },
      propietario: tratamiento.historialMascota.mascota.usuario ? {
        id: tratamiento.historialMascota.mascota.usuario.id,
        nombre: tratamiento.historialMascota.mascota.usuario.name,
        apellidoPat: tratamiento.historialMascota.mascota.usuario.apellidoPat,
        apellidoMat: tratamiento.historialMascota.mascota.usuario.apellidoMat,
        email: tratamiento.historialMascota.mascota.usuario.email,
        celular: tratamiento.historialMascota.mascota.usuario.celular,
      } : null,
    };
  } catch (error) {
    console.error("Error al obtener el tratamiento completo:", error);
    return null;
  }
}

export const obtenerResumenIngresos = async (): Promise<ResumenIngresos> => {
  try {
    const ahora = new Date();
    const inicioSemanaActual = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - ahora.getDay());
    const inicioSemanaPasada = new Date(inicioSemanaActual);
    inicioSemanaPasada.setDate(inicioSemanaPasada.getDate() - 7);
    const inicioMesActual = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const inicioMesPasado = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);

    const [ingresoSemanaActual, ingresoSemanaPasada, ingresoMesActual, ingresoMesPasado] = await Promise.all([
      db.pago.aggregate({
        _sum: { total: true },
        where: {
          estado: { not: 0 },
          // fechaPago: { gte: inicioSemanaActual }
        }
      }),
      db.pago.aggregate({
        _sum: { total: true },
        where: {
          estado: { not: 0 },
          // fechaPago: { gte: inicioSemanaPasada, lt: inicioSemanaActual }
        }
      }),
      db.pago.aggregate({
        _sum: { total: true },
        where: {
          estado: { not: 0 },
          // fechaPago: { gte: inicioMesActual }
        }
      }),
      db.pago.aggregate({
        _sum: { total: true },
        where: {
          estado: { not: 0 },
          // fechaPago: { gte: inicioMesPasado, lt: inicioMesActual }
        }
      })
    ]);

    const calcularPorcentajeCambio = (actual: Decimal, anterior: Decimal) => {
      if (anterior.isZero()) return actual.isZero() ? 0 : 100;
      return actual.minus(anterior).dividedBy(anterior).times(100).toNumber();
    };

    const ingresoSemanalActual = ingresoSemanaActual._sum.total || new Prisma.Decimal(0);
    const ingresoSemanalAnterior = ingresoSemanaPasada._sum.total || new Prisma.Decimal(0);
    const ingresoMensualActual = ingresoMesActual._sum.total || new Prisma.Decimal(0);
    const ingresoMensualAnterior = ingresoMesPasado._sum.total || new Prisma.Decimal(0);

    return {
      ingresoSemanal: ingresoSemanalActual.toFixed(2),
      ingresoMensual: ingresoMensualActual.toFixed(2),
      porcentajeCambioSemanal: calcularPorcentajeCambio(ingresoSemanalActual, ingresoSemanalAnterior),
      porcentajeCambioMensual: calcularPorcentajeCambio(ingresoMensualActual, ingresoMensualAnterior),
    };
  } catch (error) {
    console.error("Error al obtener el resumen de ingresos:", error);
    return {
      ingresoSemanal: "0.00",
      ingresoMensual: "0.00",
      porcentajeCambioSemanal: 0,
      porcentajeCambioMensual: 0,
    };
  }
}