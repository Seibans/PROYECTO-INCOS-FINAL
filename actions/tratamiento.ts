"use server"
import * as z from "zod";
import { prisma } from "@/lib/prisma"
import { TratamientoFormT, TratamientoCompleto } from '@/types';
import { usuarioIdActual } from "@/lib/auth";
import { addHours } from "date-fns"; 

export async function crearTratamiento(historialId: number, data: TratamientoFormT) {
  console.log("DETALLADO COMPLETO", JSON.stringify(data, null, 2), "DETALLADO COMPLETO SE DISPARO?");
  console.log(data)
  try {
    // Verificar el stock de los medicamentos antes de la transacción
    for (const med of data.medicamentos) {
      const medicamento = await prisma.medicamento.findUnique({
        where: { id: med.medicamentoId },
        select: { stock: true, nombre: true },
      });
      if (!medicamento) {
        return { error: `El medicamento con ID ${med.medicamentoId} no existe.` };
      }
      if (medicamento.stock < med.cantidad) {
        return { error: `No hay suficiente stock para el medicamento ${medicamento.nombre}. Stock actual: ${medicamento.stock}` };
      }
    }
    
    const idUActual = await usuarioIdActual();
    const resultado = await prisma.$transaction(async (prisma) => {
      // Crear el tratamiento
      const tratamiento = await prisma.tratamiento.create({
        data: {
          descripcion: data.descripcion,
          estado: data.estado,
          diagnostico: data.diagnostico,
          historialMascotaId: historialId,
          idUsuario: idUActual,
        },
      });

      const pago = await prisma.pago.create({
        data: {
          id: tratamiento.id,
          total: data.total,
          detalle: data.detalle,
          esAyudaVoluntaria: data.esAyudaVoluntaria,
          estado: 1,
          idUsuario: idUActual,
        },
      });

      // Crear los servicios asociados
      await prisma.servicioTratamiento.createMany({
        data: data.servicios.map(servicio => ({
          precioServicio: servicio.precioServicio,
          servicioId: servicio.servicioId,
          tratamientoId: tratamiento.id,
        })),
      });

      // Crear los medicamentos asociados y reducir el stock
      for (const med of data.medicamentos) {
        await prisma.tratamientoMedicamento.create({
          data: {
            cantidad: med.cantidad,
            costoUnitario: med.costoUnitario,
            dosificacion: med.dosificacion,
            tratamientoId: tratamiento.id,
            medicamentoId: med.medicamentoId,
          },
        });

        // Reducir el stock del medicamento
        await prisma.medicamento.update({
          where: { id: med.medicamentoId },
          data: {
            stock: {
              decrement: med.cantidad
            }
          }
        });
      }

      return tratamiento;
    });
    // Retorna el tratamiento creado si todo fue exitoso
    return { success: "El Tratamiento se registró correctamente con todos los datos", tratamiento: resultado };
    return { success: "El Tratamiento se registró correctamente con todos los datos" };
  } catch (error) {
    console.error("Error al crear el tratamiento:", error);
    return { error: "Ocurrió un Error al Crear el Tratamiento!" };
  }
}

export async function actualizarTratamiento(historialId: number, tratamientoId: number, data: TratamientoFormT) {
  try {
    // Obtener el tratamiento actual para comparar los cambios en los medicamentos
    const tratamientoActual = await prisma.tratamiento.findFirst({
      where: {
        id: tratamientoId,
        historialMascotaId: historialId,
      },
      include: { medicamentos: true },
    });

    if (!tratamientoActual) {
      return { error: "El tratamiento no existe." };
    }

    // Verificar el stock de los medicamentos antes de la transacción
    for (const med of data.medicamentos) {
      const medicamentoActual = tratamientoActual.medicamentos.find(m => m.medicamentoId === med.medicamentoId);
      const cantidadAdicional = medicamentoActual ? med.cantidad - medicamentoActual.cantidad : med.cantidad;

      if (cantidadAdicional > 0) {
        const medicamento = await prisma.medicamento.findUnique({
          where: { id: med.medicamentoId },
          select: { stock: true, nombre: true },
        });

        if (!medicamento) {
          return { error: `El medicamento con ID ${med.medicamentoId} no existe.` };
        }

        if (medicamento.stock < cantidadAdicional) {
          return { error: `No hay suficiente stock para el medicamento ${medicamento.nombre}. Stock actual: ${medicamento.stock}` };
        }
      }
    }

    const resultado = await prisma.$transaction(async (prisma) => {
      // Actualizar el tratamiento
      const tratamiento = await prisma.tratamiento.update({
        where: {
          id: tratamientoId,
          historialMascotaId: historialId,
        },
        data: {
          descripcion: data.descripcion,
          estado: data.estado,
          diagnostico: data.diagnostico,
        },
      });

      // Actualizar el pago
      await prisma.pago.update({
        // where: { id: tratamiento.id! },
        where: { id: tratamiento.id },
        data: {
          total: data.total,
          detalle: data.detalle,
          esAyudaVoluntaria: data.esAyudaVoluntaria,
        },
      });

      // Actualizar servicios
      await prisma.servicioTratamiento.deleteMany({
        where: { tratamientoId: tratamientoId },
      });
      await prisma.servicioTratamiento.createMany({
        data: data.servicios.map(servicio => ({
          precioServicio: servicio.precioServicio,
          servicioId: servicio.servicioId,
          tratamientoId: tratamientoId,
        })),
      });

      // Actualizar medicamentos y ajustar el stock
      await prisma.tratamientoMedicamento.deleteMany({
        where: { tratamientoId: tratamientoId },
      });

      for (const med of data.medicamentos) {
        await prisma.tratamientoMedicamento.create({
          data: {
            cantidad: med.cantidad,
            costoUnitario: med.costoUnitario,
            dosificacion: med.dosificacion,
            tratamientoId: tratamientoId,
            medicamentoId: med.medicamentoId,
          },
        });

        const medicamentoActual = tratamientoActual.medicamentos.find(m => m.medicamentoId === med.medicamentoId);
        const cantidadAjuste = medicamentoActual ? med.cantidad - medicamentoActual.cantidad : med.cantidad;

        if (cantidadAjuste !== 0) {
          await prisma.medicamento.update({
            where: { id: med.medicamentoId },
            data: {
              stock: {
                decrement: cantidadAjuste
              }
            }
          });
        }
      }

      return tratamiento;
    });

    // return { success: "El Tratamiento se Actualizó Correctamente!", tratamiento: resultado };
    return { success: "El Tratamiento se Actualizó Correctamente!" };
  } catch (error) {
    console.error("Error al actualizar el tratamiento:", error);
    return { error: "Ocurrió un Error al Actualizar el Tratamiento!" };
  }
}