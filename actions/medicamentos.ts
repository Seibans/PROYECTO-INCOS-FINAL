"use server";

import * as z from "zod";
import { MedicamentoSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Medicamento } from "@prisma/client";

export const obtenerMedicamentos = async ():Promise<Medicamento[]> => {
    // const mascotas = await db.mascota.findMany();
    // const users = await db.$queryRaw`
    //         SELECT * FROM mascota WHERE sexo = ${"MACHO"}
    //     ` as Mascota[];
    // const mascotas = await db.$queryRaw<Mascota[]>`
    //          SELECT * FROM mascota ORDER BY creadoEn DESC
    //          `;
    // return mascotas;
    const medicamentos = await db.medicamento.findMany();
    return medicamentos
}

export const registrarMedicamento = async (values: z.infer<typeof MedicamentoSchema>) => {
    const validatedFields = MedicamentoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { nombre, descripcion, stock, precio, tipo } = validatedFields.data;

    const pablo = await db.medicamento.create({
        data: {
            nombre,
            descripcion,
            stock,
            precio,
            tipo,
        },
    });

    return { success: "Medicamento Registrado Correctamente!" };
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
    const medicamento = await db.medicamento.delete ({
        where: {
            id,
        },
    });

    if(!medicamento) return {error: "Medicamento no Encontrado"}
    return {success: "El Medicamento fue Removido Correctamente"};
}