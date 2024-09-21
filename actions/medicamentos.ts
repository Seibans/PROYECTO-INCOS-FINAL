"use server";
import Decimal from 'decimal.js';

import * as z from "zod";
import { MedicamentoSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Medicamento, TipoMedicamento } from "@prisma/client";
import { MedicamentoT } from '@/types';
import { usuarioIdActual } from "@/lib/auth";
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export const obtenerMedicamentos = async (): Promise<MedicamentoT[]> => {
    try {
        const medicamentos = await db.medicamento.findMany({
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


// export const registrarMedicamento = async (values: z.infer<typeof MedicamentoSchema>) => {
//     const validatedFields = MedicamentoSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Campos Inválidos!" };
//     }

//     const { nombre, descripcion, stock, precio, tipo } = validatedFields.data;


export const registrarMedicamento = async (values: FormData) => {
    try {
        const nombre = values.get('nombre') as string;
        const descripcion = values.get('descripcion') as string;
        const stock = parseInt(values.get('stock') as string, 10);
        const precio = parseFloat(values.get('precio') as string);
        const tipo = values.get('tipo') as TipoMedicamento;
        const archivoImagen = values.get('imagen') as File | null;
        let rutaImagen = null;

        if (archivoImagen) {
            const nombreUnico = `${uuidv4()}_${archivoImagen.name}`;
            const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'admin','medicamentos',nombreUnico);
            await fs.ensureDir(path.dirname(rutadeAlmacenamiento));

            const arrayBuffer = await archivoImagen.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(rutadeAlmacenamiento, buffer);
            rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/admin/medicamentos/${nombreUnico}`;
        }
        const idUActual = await usuarioIdActual();
        const medicamento = await db.medicamento.create({
            data: {
                nombre,
                descripcion,
                stock,
                precio,
                tipo,
                idUsuario: idUActual,
                imagen: rutaImagen,
            },
        });

        return { success: "Medicamento Registrado Correctamente!" };
    } catch (error) {
        console.error("Error al registrar medicamento:", error);
        return { error: "Ocurrió un error al registrar el medicamento." };
    }
};

export const editarMedicamento = async (values: z.infer<typeof MedicamentoSchema>, idMedicamento: number) => {
    const validatedFields = MedicamentoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    try {
        const idUActual = await usuarioIdActual();
        const medicamentoActualizado = await db.medicamento.update({
            where: {
                id: idMedicamento
            },
            data: {
                ...values,
                idUsuario: idUActual,
            }
        })

        return { success: "Medicamento Editado Correctamente!" };
    } catch (error) {
        console.error("Error al actualizar el medicamento:", error);
        return { error: "Ocurrió un error al actualizar el medicamento." };
    }
};

export const obtenerMedicamento = async (id: number) => {
    try {
        // Intentamos obtener el medicamento
        const medicamento = await db.medicamento.findUnique({
            where: {
                id,
            },
        });

        // Si no se encuentra el medicamento, devolvemos null
        if (!medicamento) {
            return null;
        }

        // Maneja el caso donde el precio podría ser null o undefined
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
        const medicamento = await db.medicamento.delete({
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

        const medicamento = await db.medicamento.update({
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

