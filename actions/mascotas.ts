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
    // const mascotas = await db.$queryRaw<Mascota[]>`
    //          SELECT * FROM mascota ORDER BY creadoEn DESC
    //          `;

    const mascotas = await db.mascota.findMany({
        where: {
            estado: 1,
        },
        orderBy: {
            creadoEn: 'desc',
        },
        select: {
            id: true,
            nombre: true,
            especie: true,
            raza: true,
            sexo: true,
            fechaNacimiento: true,
            detalles: true,
            imagen: true,
            estado: true,
            creadoEn: true,
            actualizadoEn: true,
            idUsuario: true,
            idPropietario: true,
            esterilizado: true,
            alergias: true,
            observaciones: true,
        },
    });
    return mascotas;
}

export const registrarMascota = async (mascotaValues: z.infer<typeof MascotaSchema>) => {
    const validatedMascota = MascotaSchema.safeParse(mascotaValues);

    if (!validatedMascota.success) {
        return { error: "Campos Inválidos!" };
    }

    const { nombre, especie, raza, fechaNacimiento, sexo, detalles } = validatedMascota.data;

    const idUActual = await usuarioIdActual();
    try {
        const mascota = await db.$transaction(async (tx) => {
            // Crear la mascota
            const createdMascota = await tx.mascota.create({
                data: {
                    nombre,
                    especie,
                    raza,
                    fechaNacimiento,
                    sexo,
                    detalles,
                    idUsuario: idUActual,
                    idPropietario: idUActual
                },
            });

            await tx.historialMedico.create({
                data: {
                    mascotaId: createdMascota.id,
                    estado: 1,
                    idUsuario: idUActual,
                },
            });

            return createdMascota;
        });

        return { success: "Mascota y Historial Médico Registrados Correctamente!" };
    } catch (error) {
        console.error("Error al registrar mascota y historial médico:", error);
        return { error: "Ocurrió un error al registrar la mascota y su historial médico." };
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

export const deshabilitarMascota = async (id: number) => {
    const usuarioActualId = await usuarioIdActual();
    if (!usuarioActualId) {
        throw new Error('ID del usuario autenticado no está definido');
    }

    if (isNaN(usuarioActualId)) {
        throw new Error('ID del usuario autenticado no es un número válido');
    }
    try {
        const mascota = await db.mascota.update({
            where: {
                id,
            },
            data: {
                estado: 0,
                idUsuario: usuarioActualId,
            },
        });
        if (!mascota) return { error: "Mascota no Encontrada" }
        return { success: "La Mascota fue Eliminada Correctamente" };
    } catch (error) {
        return { error: "Mascota no Encontrada" }
    }

}