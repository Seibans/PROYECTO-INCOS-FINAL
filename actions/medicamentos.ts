"use server";

import * as z from "zod";
import { MascotaSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Mascota } from "@prisma/client";

export const obtenerMedicamentos = async ():Promise<Mascota[]> => {
    // const mascotas = await db.mascota.findMany();
    // const users = await db.$queryRaw`
    //         SELECT * FROM mascota WHERE sexo = ${"MACHO"}
    //     ` as Mascota[];
    const mascotas = await db.$queryRaw<Mascota[]>`
             SELECT * FROM mascota ORDER BY creadoEn DESC
             `;
    return mascotas;
}

export const registrarMedicamento = async (values: z.infer<typeof MascotaSchema>) => {
    const validatedFields = MascotaSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos Inválidos!" };
    }

    const { nombre, especie, raza, sexo, fechaNacimiento, detalles } = validatedFields.data;

    const pablo = await db.mascota.create({
        data: {
            nombre,
            especie,
            raza,
            sexo,
            fechaNacimiento,
            detalles,
        },
    });

    return { success: "Mascota Registrada Correctamente!" };
};

export const editarMedicamento = async (values: z.infer<typeof MascotaSchema>, idMascota: number) => {
    const validatedFields = MascotaSchema.safeParse(values);

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

    const mascotaActualizada = await db.mascota.update({
        where: {
            id: idMascota
        },
        data: {
            ...values
        }
    })

    return { success: "Mascota Registrada Correctamente!" };
};

export const obtenerMedicamento = async (id: number) => {
    const mascota = await db.mascota.findUnique({
        where: {
            id,
        },
    });
    return mascota;
}

export const eliminarMedicamento = async (id: number) => {
    const mascota = await db.mascota.delete ({
        where: {
            id,
        },
    });

    if(!mascota) return {error: "Mascota no Encontrada"}
    return {success: "La Mascota fue Removida Correctamente"};
}