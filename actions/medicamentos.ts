"use server";
import Decimal from 'decimal.js';

import * as z from "zod";
import { MedicamentoSchema } from "@/schemas";
import { prisma } from "@/lib/prisma"
import { Medicamento, TipoMedicamento } from "@prisma/client";
import { MedicamentoT } from '@/types';
import { usuarioIdActual } from "@/lib/auth";
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { formatearDetalle } from '@/lib/formatearDescripcion';
import { formatearNombre } from '@/lib/formatearNombre';


export const obtenerMedicamentos = async (): Promise<MedicamentoT[]> => {
    try {
        const medicamentos = await prisma.medicamento.findMany({
            where: {
                estado: 1,
            },
            orderBy: {
                creadoEn: 'desc',
            }
        });
        const pablo = medicamentos.map((medicamento) => ({
            ...medicamento,
            precio: new Decimal(medicamento.precio).toNumber().toFixed(2),
        }));
        return pablo;
    } catch (error) {
        console.error("Error al obtener medicamentos:", error);
        throw new Error("Ocurrió un error al obtener los medicamentos.");
    }
};

export const registrarMedicamento = async (
    formMedicamento: FormData,
) => {
    try {
        console.log(formMedicamento);
        const archivo = formMedicamento.get("archivo") as File | null;

        if (!archivo) {
            return { error: "La imagen es requerida" };
        }

        const nombre = formMedicamento.get('nombre') as string;
        const descripcion = formatearDetalle(formMedicamento.get('descripcion') as string);
        const indicaciones = formatearDetalle(formMedicamento.get('indicaciones') as string);
        const unidadMedida = formMedicamento.get('unidadMedida') as string;
        const cantidadPorUnidad = parseInt(formMedicamento.get('cantidadPorUnidad') as string, 10);
        const stock = parseInt(formMedicamento.get('stock') as string, 10);
        const precio = formMedicamento.get('precio') as string;
        const sobrante = parseInt(formMedicamento.get('sobrante') as string, 10);
        const tipo = formMedicamento.get('tipo') as TipoMedicamento;
        let rutaImagen: string = "";

        if (archivo) {
            const nombreUnico = `${uuidv4()}_${archivo.name}`;
            const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'medicamentos', nombreUnico);
            await fs.ensureDir(path.dirname(rutadeAlmacenamiento));
            const buffer = Buffer.from(await archivo.arrayBuffer());
            await fs.writeFile(rutadeAlmacenamiento, buffer);
            rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/medicamentos/${nombreUnico}`;
        }

        const medicamento = await prisma.medicamento.create({
            data: {
                nombre,
                descripcion,
                indicaciones,
                unidadMedida,
                cantidadPorUnidad,
                sobrante,
                stock,
                precio,
                tipo,
                idUsuario: await usuarioIdActual(),
                imagen: rutaImagen,
            },
        });

        return { success: "Medicamento Registrado Correctamente!" };
    } catch (error) {
        console.error("Error al registrar medicamento:", error);
        return { error: "Ocurrió un error al registrar el medicamento." };
    }
};


export const editarMedicamento = async (
    values: z.infer<typeof MedicamentoSchema>,
    idMedicamento: number,
) => {
    try {
console.log(values);

        const validatedFields = MedicamentoSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Campos Inválidos!" };
        }
        const { codigo, nombre, descripcion, stock, precio, tipo, indicaciones, unidadMedida, cantidadPorUnidad, sobrante } = validatedFields.data;

        const descripcionF = formatearDetalle(descripcion);
        const indicacionesF = formatearDetalle(indicaciones);
        const medicamentoActualizado = await prisma.medicamento.update({
            where: { id: idMedicamento },
            data: {
                codigo,
                nombre,
                descripcion: descripcionF,
                indicaciones: indicacionesF,
                unidadMedida,
                cantidadPorUnidad,
                sobrante,
                stock,
                precio,
                tipo,
                idUsuario: await usuarioIdActual(),
            },
        });

        return { success: "Medicamento actualizado correctamente!" };
    } catch (error) {
        console.error("Error al editar medicamento:", error);
        return { error: "Ocurrió un error al editar el medicamento." };
    }
};


export const obtenerMedicamento = async (id: number) => {
    try {
        const medicamento = await prisma.medicamento.findUnique({
            where: {
                id,
            },
        });

        if (!medicamento) {
            return null;
        }

        const precioDecimal = medicamento.precio ? new Decimal(medicamento.precio) : new Decimal(0);

        return {
            ...medicamento,
            precio: precioDecimal.toNumber().toFixed(2),  // Convertir Decimal a número con 2 decimales
        };
    } catch (error) {
        console.error("Error al obtener el medicamento:", error);
        throw new Error("Ocurrió un error al obtener el medicamento.");
    }
};

export const eliminarMedicamento = async (id: number) => {
    try {
        const medicamento = await prisma.medicamento.delete({
            where: { id },
        });

        if (!medicamento) return { error: "Medicamento no Encontrado" };
        return { success: "El Medicamento fue Removido Correctamente" };
    } catch (error) {
        console.error("Error al eliminar el medicamento:", error);
        return { error: "Ocurrió un error al eliminar el medicamento." };
    }
};

export const deshabilitarMedicamento = async (id: number) => {
    try {
        const usuarioActualId = await usuarioIdActual();

        if (!usuarioActualId || isNaN(usuarioActualId)) {
            throw new Error('ID del usuario autenticado no es válido');
        }

        const medicamento = await prisma.medicamento.update({
            where: { id },
            data: {
                estado: 0,
                idUsuario: usuarioActualId,
            },
        });

        if (!medicamento) return { error: "Medicamento no Encontrado" };
        return { success: "El Medicamento fue Deshabilitado Correctamente" };
    } catch (error) {
        console.error("Error al deshabilitar el medicamento:", error);
        return { error: "Ocurrió un error al deshabilitar el medicamento." };
    }
};










// export const registrarMedicamento = async (values: z.infer<typeof MedicamentoSchema>) => {
//     const validatedFields = MedicamentoSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Campos Inválidos!" };
//     }

//     const { nombre, descripcion, stock, precio, tipo } = validatedFields.data;


// export const registrarMedicamento = async (values: FormData) => {
//     try {
//         const nombre = values.get('nombre') as string;
//         const descripcion = values.get('descripcion') as string;
//         const stock = parseInt(values.get('stock') as string, 10);
//         const precio = parseFloat(values.get('precio') as string);
//         const tipo = values.get('tipo') as TipoMedicamento;
//         const archivoImagen = values.get('imagen') as File | null;
//         let rutaImagen = null;

//         if (archivoImagen) {
//             const nombreUnico = `${uuidv4()}_${archivoImagen.name}`;
//             const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'admin','medicamentos',nombreUnico);
//             await fs.ensureDir(path.dirname(rutadeAlmacenamiento));

//             const arrayBuffer = await archivoImagen.arrayBuffer();
//             const buffer = new Uint8Array(arrayBuffer);
//             await fs.writeFile(rutadeAlmacenamiento, buffer);
//             rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/admin/medicamentos/${nombreUnico}`;
//         }
//         const idUActual = await usuarioIdActual();
//         const medicamento = await prisma.medicamento.create({
//             data: {
//                 nombre,
//                 descripcion,
//                 stock,
//                 precio,
//                 tipo,
//                 idUsuario: idUActual,
//                 imagen: rutaImagen,
//             },
//         });

//         return { success: "Medicamento Registrado Correctamente!" };
//     } catch (error) {
//         console.error("Error al registrar medicamento:", error);
//         return { error: "Ocurrió un error al registrar el medicamento." };
//     }
// };



// export const editarMedicamento = async (values: z.infer<typeof MedicamentoSchema>, idMedicamento: number) => {
//     const validatedFields = MedicamentoSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Campos Inválidos!" };
//     }

//     try {
//         const idUActual = await usuarioIdActual();
//         const medicamentoActualizado = await prisma.medicamento.update({
//             where: {
//                 id: idMedicamento
//             },
//             data: {
//                 ...values,
//                 idUsuario: idUActual,
//             }
//         })

//         return { success: "Medicamento Editado Correctamente!" };
//     } catch (error) {
//         console.error("Error al actualizar el medicamento:", error);
//         return { error: "Ocurrió un error al actualizar el medicamento." };
//     }







// const validatedFields = MedicamentoSchema.safeParse(values);
// if (!validatedFields.success) {
//     return { error: "Campos Inválidos!" };
// }

// const { nombre, descripcion, stock, precio, tipo, archivo } = validatedFields.data;
// };