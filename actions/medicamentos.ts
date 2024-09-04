"use server";
import Decimal from 'decimal.js';

import * as z from "zod";
import { MedicamentoSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Medicamento, TipoMedicamento } from "@prisma/client";
import { MedicamentoT } from '@/types';

export const obtenerMedicamentos = async (): Promise<MedicamentoT[]> => {
    // const mascotas = await db.mascota.findMany();
    // const users = await db.$queryRaw`
    //         SELECT * FROM mascota WHERE sexo = ${"MACHO"}
    //     ` as Mascota[];
    // const mascotas = await db.$queryRaw<Mascota[]>`
    //          SELECT * FROM mascota ORDER BY creadoEn DESC
    //          `;
    // return mascotas;
    // const medicamentos = await db.medicamento.findMany();
    // // return medicamentos.map((medicamento) => ({
    // //     ...medicamento,
    // //     precio: new Decimal(medicamento.precio).toNumber(),  // Convierte Decimal a number
    // //   }));

    // return medicamentos.map((medicamento) => ({
    //     ...medicamento,
    //     precio: new Decimal(medicamento.precio.toString()),  // Usa Decimal aquí
    // }));
    // return medicamentos;


    const medicamentos = await db.medicamento.findMany();
    return medicamentos.map((medicamento) => ({
        ...medicamento,
        precio: new Decimal(medicamento.precio).toNumber(),  // Convertir Decimal a number
    }));

    // MANEJAR NULL EN EL MAPEO
    // return medicamentos.map((medicamento) => ({
    //     ...medicamento,
    //     precio: new Decimal(medicamento.precio).toNumber(),  // Convertir Decimal a number
    //     descripcion: medicamento.descripcion ?? "",  // Manejar null y asignar valor predeterminado
    // }));
}

export const registrarMedicamento = async (values: z.infer<typeof MedicamentoSchema>) => {
    const validatedFields = MedicamentoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { nombre, descripcion, stock, precio, tipo } = validatedFields.data;

    try {
        const medicamento = await db.medicamento.create({
            data: {
                nombre,
                descripcion,
                stock,
                precio,
                tipo,
                idUsuario: 1,
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

    // const { nombre, especie, raza, sexo, fechaNacimiento, detalles } = validatedFields.data;
    // console.log(validatedFields.data)
    // console.log(idMascota)

    // const pablo = await db.mascota.update({
    //     data: {
    //         nombre,
    //         especie,
    //         raza,
    //         sexo,
    //         fechaNacimiento,
    //         detalles,
    //     },
    // });

    const medicamentoActualizado = await db.medicamento.update({
        where: {
            id: idMedicamento
        },
        data: {
            ...values
        }
    })

    return { success: "Medicamento Editado Correctamente!" };
};

export const obtenerMedicamento = async (id: number) => {
    const medicamento = await db.medicamento.findUnique({
        where: {
            id,
        },
    });
    return medicamento;
}

export const eliminarMedicamento = async (id: number) => {
    const medicamento = await db.medicamento.delete({
        where: {
            id,
        },
    });

    if (!medicamento) return { error: "Medicamento no Encontrado" }
    return { success: "El Medicamento fue Removido Correctamente" };
}