import { db } from "@/lib/db";
import { TratamientoFormT, TratamientoCompleto } from '@/types';

export async function crearTratamiento(historialId: number, data: TratamientoFormT) {
  console.log("DETALLADO COMPLETO", JSON.stringify(data, null, 2), "DETALLADO COMPLETO");
  try {
    const resultado = await db.$transaction(async (prisma) => {
      // Crear el pago primero
      const pago = await prisma.pago.create({
        data: {
          total: data.total.toString(),
          detalle: data.detalle,
          esAyudaVoluntaria: data.esAyudaVoluntaria,
          estado: 1,
          idUsuario: 1, // Asumiendo que 1 es el ID de usuario por defecto
        },
      });

      // Crear el tratamiento
      const tratamiento = await prisma.tratamiento.create({
        data: {
          descripcion: data.descripcion,
          estado: data.estado,
          diagnostico: data.diagnostico,
          historialMascotaId: data.historialMascotaId,
          pagoId: pago.id,
          idUsuario: 1, // Asumiendo que 1 es el ID de usuario por defecto
        },
      });

      // Crear serviciosTratamiento
      await Promise.all(data.servicios.map(servicio =>
        prisma.servicioTratamiento.create({
          data: {
            precioServicio: servicio.precioServicio,
            servicioId: servicio.servicioId,
            tratamientoId: tratamiento.id,
          },
        })
      ));

      // Crear tratamientoMedicamento
      await Promise.all(data.medicamentos.map(medicamento =>
        prisma.tratamientoMedicamento.create({
          data: {
            cantidad: medicamento.cantidad,
            costoUnitario: medicamento.costoUnitario,
            dosificacion: medicamento.dosificacion,
            tratamientoId: tratamiento.id,
            medicamentoId: medicamento.medicamentoId,
          },
        })
      ));

      return tratamiento;
    });

    return { success: "El Tratamiento se registró correctamente con todos los datos", tratamiento: resultado };
  } catch (error) {
    console.error("Error al crear el tratamiento:", error);
    return { error: "Ocurrió un Error al Crear el Tratamiento!" };
  }
}

export async function actualizarTratamiento(historialId: number, tratamientoId: number, data: TratamientoFormT) {

  console.log(historialId, tratamientoId, data,"   HISTORIAL Y DATA");
  console.log("DETALLADO COMPLETO", JSON.stringify(data, null, 2), "DETALLADO COMPLETO");
  try {
    const resultado = await db.$transaction(async (prisma) => {
      // Actualizar el tratamiento
      const tratamiento = await prisma.tratamiento.update({
        where: { id: tratamientoId },
        data: {
          descripcion: data.descripcion,
          estado: data.estado,
          diagnostico: data.diagnostico,
        },
      });

      // Actualizar el pago
      await prisma.pago.update({
        where: { id: tratamiento.pagoId! },
        data: {
          total: data.total.toString(),
          detalle: data.detalle,
          esAyudaVoluntaria: data.esAyudaVoluntaria,
        },
      });

      // Eliminar serviciosTratamiento existentes y crear nuevos
      await prisma.servicioTratamiento.deleteMany({
        where: { tratamientoId: tratamientoId },
      });
      await Promise.all(data.servicios.map(servicio =>
        prisma.servicioTratamiento.create({
          data: {
            precioServicio: servicio.precioServicio,
            servicioId: servicio.servicioId,
            tratamientoId: tratamientoId,
          },
        })
      ));

      // Eliminar tratamientoMedicamento existentes y crear nuevos
      await prisma.tratamientoMedicamento.deleteMany({
        where: { tratamientoId: tratamientoId },
      });
      await Promise.all(data.medicamentos.map(medicamento =>
        prisma.tratamientoMedicamento.create({
          data: {
            cantidad: medicamento.cantidad,
            costoUnitario: medicamento.costoUnitario,
            dosificacion: medicamento.dosificacion,
            tratamientoId: tratamientoId,
            medicamentoId: medicamento.medicamentoId,
          },
        })
      ));

      return tratamiento;
    });

    return { success: "El Tratamiento se Actualizó Correctamente!", tratamiento: resultado };
  } catch (error) {
    console.error("Error al actualizar el tratamiento:", error);
    return { error: "Ocurrió un Error al Actualizar el Tratamiento!" };
  }
}