"use server";

import * as z from "zod";
import { MascotaSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Mascota } from "@prisma/client";
import { usuarioIdActual } from "@/lib/auth";
import { addHours } from "date-fns"; 

export const obtenerMascotas = async (): Promise<Mascota[]> => {
    const mascotas = await db.mascota.findMany({
        where: {
            estado: 1,
        },
        orderBy: {
            creadoEn: 'desc',
        },
        // select: {
        //     id: true,
        //     nombre: true,
        //     especie: true,
        //     raza: true,
        //     sexo: true,
        //     fechaNacimiento: true,
        //     detalles: true,
        //     imagen: true,
        //     estado: true,
        //     creadoEn: true,
        //     actualizadoEn: true,
        //     idUsuario: true,
        //     idPropietario: true,
        //     esterilizado: true,
        //     alergias: true,
        //     observaciones: true,
        // },
    });
    const mascotasConFechaAjustada = mascotas.map(mascota => ({
        ...mascota,
        fechaNacimiento: mascota.fechaNacimiento ? addHours(new Date(mascota.fechaNacimiento), 4) : null,
    }));

    return mascotasConFechaAjustada;
}

export const registrarMascota = async (mascotaValues: z.infer<typeof MascotaSchema>) => {
    const validatedMascota = MascotaSchema.safeParse(mascotaValues);

    if (!validatedMascota.success) {
        return { error: "Campos Inválidos!" };
    }

    const { nombre, especie, raza, fechaNacimiento, sexo, detalles } = validatedMascota.data;

    try {
        const idUActual = await usuarioIdActual();
        const mascota = await db.$transaction(async (tx) => {
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
        return { error: "Campos inválidos!" };
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
    try {
        const idUActual = await usuarioIdActual();
        const mascotaActualizada = await db.mascota.update({
            where: {
                id: idMascota,
            },
            data: {
                ...values,
                idUsuario: idUActual,
            },
        });

        return { success: "Mascota Editada Correctamente!" };
    } catch (error) {
        console.error("Error al actualizar la mascota:", error);
        return { error: "Ocurrió un error al actualizar la mascota." };
    }
};

export const obtenerMascota = async (id: number) => {
    try {
        // Intentamos obtener la mascota
        const mascota = await db.mascota.findUnique({
            where: {
                id,
            },
        });

        // Si se encuentra la mascota, ajustamos la fecha de nacimiento
        if (mascota) {
            return {
                ...mascota,
                fechaNacimiento: mascota.fechaNacimiento
                    ? addHours(new Date(mascota.fechaNacimiento), 4) // Agregamos 4 horas a la fecha de nacimiento
                    : null,
            };
        }

        // Si no se encuentra la mascota, devolvemos null
        return null;
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
        throw new Error("Ocurrió un error al obtener la mascota.");
    }
};



export const eliminarMascota = async (id: number) => {
    try {
        const mascota = await db.mascota.delete({
            where: { id },
        });

        if (!mascota) return { error: "Mascota no Encontrada" };
        return { success: "La Mascota fue Removida Correctamente" };
    } catch (error) {
        console.error("Error al eliminar la mascota:", error);
        return { error: "Ocurrió un error al eliminar la mascota." };
    }
};


export const deshabilitarMascota = async (id: number) => {
    try {
        const usuarioActualId = await usuarioIdActual();

        if (!usuarioActualId || isNaN(usuarioActualId)) {
            throw new Error('ID del usuario autenticado no es válido');
        }

        const mascota = await db.mascota.update({
            where: { id },
            data: {
                estado: 0,
                idUsuario: usuarioActualId,
            },
        });

        if (!mascota) return { error: "Mascota no Encontrada" };
        return { success: "La Mascota fue Deshabilitada Correctamente" };
    } catch (error) {
        console.error("Error al deshabilitar la mascota:", error);
        return { error: "Ocurrió un error al deshabilitar la mascota." };
    }
};
