// 'use server'

// import { db } from "@/lib/db";

// interface MedicamentoTratamiento {
//   id: number;
//   cantidad: number;
// }

// interface TratamientoData {
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   diagnostico: string;
//   historialMedicoId: number;
//   veterinarioId: number;
//   medicamentos: MedicamentoTratamiento[];
//   esAyudaVoluntaria: boolean;
//   cuotas: number;
// }

// export async function registerTreatment(data: TratamientoData) {
//   return await db.$transaction(async (prisma) => {
//     // Crear el tratamiento
//     const tratamiento = await prisma.tratamiento.create({
//       data: {
//         nombre: data.nombre,
//         descripcion: data.descripcion,
//         precio: data.precio,
//         diagnostico: data.diagnostico,
//         historialMedicoId: data.historialMedicoId,
//         veterinarioId: data.veterinarioId,
//       },
//     });

//     // Registrar los medicamentos usados
//     for (const med of data.medicamentos) {
//       await prisma.tratamientoMedicamento.create({
//         data: {
//           tratamientoId: tratamiento.id,
//           medicamentoId: med.id,
//           cantidad: med.cantidad,
//         },
//       });

//       // Actualizar el stock del medicamento
//       await prisma.medicamento.update({
//         where: { id: med.id },
//         data: { stock: { decrement: med.cantidad } },
//       });
//     }

//     // Calcular el costo total del tratamiento
//     const costoMedicamentos = await prisma.tratamientoMedicamento.aggregate({
//       where: { tratamientoId: tratamiento.id },
//       _sum: {
//         cantidad: true,
//       },
//       _avg: {
//         medicamento: {
//           select: {
//             precio: true,
//           },
//         },
//       },
//     });

//     const costoTotal = data.precio + (costoMedicamentos._sum.cantidad || 0) * (costoMedicamentos._avg.medicamento?.precio || 0);

//     // Crear el pago
//     const pago = await prisma.pago.create({
//       data: {
//         total: costoTotal,
//         cuotas: data.cuotas,
//         montoCuota: costoTotal / data.cuotas,
//         usuarioId: data.esAyudaVoluntaria ? 1 : data.veterinarioId, // Asumiendo que el ID 1 es el admin principal
//         esAyudaVoluntaria: data.esAyudaVoluntaria,
//         tratamiento: { connect: { id: tratamiento.id } },
//       },
//     });

//     // Crear las cuotas de pago
//     for (let i = 0; i < data.cuotas; i++) {
//       await prisma.cuotaPago.create({
//         data: {
//           pagoId: pago.id,
//           monto: costoTotal / data.cuotas,
//         },
//       });
//     }

//     return tratamiento;
//   });
// }