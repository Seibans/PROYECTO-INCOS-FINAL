// // app/admin/historiales/[historialId]/actions.ts

// import { db } from "@/lib/db";
// import { revalidatePath } from 'next/cache'
// import { TratamientoT, TratamientoMedicamentoT, ServicioT } from '@/types'

// export async function obtenerHistorial(historialId: string) {
//   const historial = await db.historialMedico.findUnique({
//     where: { id: parseInt(historialId) },
//     include: {
//       mascota: true,
//       tratamientos: {
//         include: {
//           medicamentos: {
//             include: { medicamento: true }
//           },
//           servicios: true
//         }
//       }
//     }
//   })

//   return historial
// }

// export async function obtenerTratamiento(historialId: string, tratamientoId: string) {
//   const tratamiento = await db.tratamiento.findFirst({
//     where: {
//       id: parseInt(tratamientoId),
//       historialMedicoId: parseInt(historialId)
//     },
//     include: {
//       medicamentos: {
//         include: { medicamento: true }
//       },
//       servicios: true
//     }
//   })

//   return tratamiento
// }

// export async function crearTratamiento(historialId: string, data: TratamientoT, idUsuario: number) {
//   const resultado = await db.$transaction(async (prisma) => {
//     const tratamiento = await prisma.tratamiento.create({
//       data: {
//         descripcion: data.descripcion,
//         diagnostico: data.diagnostico,
//         estado: data.estado,
//         historialMedicoId: parseInt(historialId),
//         idUsuario: idUsuario,
//         medicamentos: {
//           create: data.medicamentos.map(med => ({
//             cantidad: med.cantidad,
//             costoUnitario: med.costoUnitario,
//             dosificacion: med.dosificacion,
//             medicamentoId: med.medicamento.id
//           }))
//         },
//         servicios: {
//           connect: data.servicios.map(serv => ({ id: serv.id }))
//         }
//       }
//     })

//     // Actualizar el stock de los medicamentos
//     for (const med of data.medicamentos) {
//       await prisma.medicamento.update({
//         where: { id: med.medicamento.id },
//         data: { 
//           stock: { decrement: med.cantidad },
//           sobrante: { 
//             increment: med.medicamento.cantidadPorUnidad * med.cantidad - med.cantidad 
//           }
//         }
//       })
//     }

//     // Crear el pago asociado al tratamiento
//     await prisma.pago.create({
//       data: {
//         total: 10,
//         fechaPago: new Date(),
//         detalle: `Pago por tratamiento ${tratamiento.id}`,
//         tratamiento: { connect: { id: tratamiento.id } },
//         idUsuario: idUsuario
//       }
//     })

//     return tratamiento
//   })

//   revalidatePath(`/admin/historiales/${historialId}`)
//   return resultado
// }

// export async function actualizarTratamiento(historialId: string, tratamientoId: string, data: TratamientoT, idUsuario: number) {
//   const resultado = await db.$transaction(async (prisma) => {
//     const tratamientoAnterior = await prisma.tratamiento.findUnique({
//       where: { id: parseInt(tratamientoId) },
//       include: { medicamentos: true }
//     })

//     if (!tratamientoAnterior) {
//       throw new Error('Tratamiento no encontrado')
//     }

//     // Actualizar el stock de los medicamentos (devolver el stock anterior y restar el nuevo)
//     for (const medAnterior of tratamientoAnterior.medicamentos) {
//       await prisma.medicamento.update({
//         where: { id: medAnterior.medicamentoId },
//         data: { 
//           stock: { increment: medAnterior.cantidad },
//           sobrante: { 
//             decrement: medAnterior.medicamento.cantidadPorUnidad * medAnterior.cantidad - medAnterior.cantidad 
//           }
//         }
//       })
//     }

//     for (const med of data.medicamentos) {
//       await prisma.medicamento.update({
//         where: { id: med.medicamento.id },
//         data: { 
//           stock: { decrement: med.cantidad },
//           sobrante: { 
//             increment: med.medicamento.cantidadPorUnidad * med.cantidad - med.cantidad 
//           }
//         }
//       })
//     }

//     // Actualizar el tratamiento
//     const tratamientoActualizado = await prisma.tratamiento.update({
//       where: { id: parseInt(tratamientoId) },
//       data: {
//         descripcion: data.descripcion,
//         diagnostico: data.diagnostico,
//         estado: data.estado,
//         idUsuario: idUsuario,
//         medicamentos: {
//           deleteMany: {},
//           create: data.medicamentos.map(med => ({
//             cantidad: med.cantidad,
//             costoUnitario: med.costoUnitario,
//             dosificacion: med.dosificacion,
//             medicamentoId: med.medicamento.id
//           }))
//         },
//         servicios: {
//           set: data.servicios.map(serv => ({ id: serv.id }))
//         }
//       }
//     })

//     // Actualizar el pago asociado al tratamiento
//     await prisma.pago.updateMany({
//       where: { tratamientoId: parseInt(tratamientoId) },
//       data: {
//         total: data.precio,
//         detalle: `Pago actualizado por tratamiento ${tratamientoId}`,
//         idUsuario: idUsuario
//       }
//     })

//     return tratamientoActualizado
//   })

//   revalidatePath(`/admin/historiales/${historialId}`)
//   return resultado
// }