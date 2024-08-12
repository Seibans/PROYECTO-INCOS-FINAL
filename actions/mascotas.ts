"use server";

import * as z from "zod";
import { MascotaSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Mascota } from "@prisma/client";
import { usuarioIdActual } from "@/lib/auth";

export const obtenerMascotas = async (): Promise<Mascota[]> => {
    // const mascotas = await db.mascota.findMany();
    // const users = await db.$queryRaw`
    //         SELECT * FROM mascota WHERE sexo = ${"MACHO"}
    //     ` as Mascota[];
    const mascotas = await db.$queryRaw<Mascota[]>`
             SELECT * FROM mascota ORDER BY creadoEn DESC
             `;
    return mascotas;
}

export const registrarMascota = async (values: z.infer<typeof MascotaSchema>) => {
    try {


        const validatedFields = MascotaSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Campos Inválidos!" };
        }

        const { nombre, especie, raza, sexo, fechaNacimiento, detalles } = validatedFields.data;
        const idUActual = await usuarioIdActual();
        console.log({idUActual}, validatedFields.data);

        const pablo = await db.mascota.create({
            data: {
                nombre,
                especie,
                raza,
                sexo,
                fechaNacimiento,
                detalles,
                idUsuario: idUActual,
                idPropietario: idUActual
            },
        });

        return { success: "Mascota Registrada Correctamente!" };
    } catch (error) {
        console.log(error)
        return { error: "La Mascota no se Pudo Registrar!" };
    }
};

export const editarMascota = async (values: z.infer<typeof MascotaSchema>, idMascota: number) => {
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

export const obtenerMascota = async (id: number) => {
    const mascota = await db.mascota.findUnique({
        where: {
            id,
        },
    });
    return mascota;
}

export const eliminarMascota = async (id: number) => {
    const mascota = await db.mascota.delete({
        where: {
            id,
        },
    });

    if (!mascota) return { error: "Mascota no Encontrada" }
    return { success: "La Mascota fue Removida Correctamente" };
}