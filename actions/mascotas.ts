"use server";

import * as z from "zod";
import { MascotaSchema } from "@/schemas";
import { db } from "@/lib/db";
import { Mascota, Sexo, TipoMascota } from "@prisma/client";
import { usuarioIdActual } from "@/lib/auth";
import { addHours } from "date-fns"; 
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { formatearNombre } from "@/lib/formatearNombre";
import { formatearDetalle } from "@/lib/formatearDescripcion";

export const obtenerMascotas = async (): Promise<Mascota[]> => {
    const mascotas = await db.mascota.findMany({
        where: {
            estado: {
                not: 0
            },
        },
        orderBy: {
            creadoEn: 'desc',
        }
    });
    const mascotasConFechaAjustada = mascotas.map(mascota => ({
        ...mascota,
        fechaNacimiento: mascota.fechaNacimiento ? addHours(new Date(mascota.fechaNacimiento), 4) : null,
    }));

    return mascotasConFechaAjustada;
}

//TODO: Corregir bug de campos invalidos
export const registrarMascota = async (mascotaValues: z.infer<typeof MascotaSchema>) => {
    const validatedMascota = MascotaSchema.safeParse(mascotaValues);
    console.log(validatedMascota.error)
    if (!validatedMascota.success) {
        return { error: "Campos Inválidos!" };
    }
    const { nombre, especie, raza, fechaNacimiento, sexo, detalles, idPropietario, peso, esterilizado, estado } = validatedMascota.data;
    // if(isNaN(idPropietario))

    const nombreF = formatearNombre(nombre);
    const detallesF = formatearDetalle(detalles);
    try {
        const idUActual = await usuarioIdActual();
        const mascota = await db.$transaction(async (tx) => {
            const mascotaCreada = await tx.mascota.create({
                data: {
                    nombre: nombreF,
                    especie,
                    raza,
                    fechaNacimiento,
                    sexo,
                    detalles: detallesF,
                    idPropietario,
                    peso: parseFloat(peso as string),
                    esterilizado,
                    estado: parseInt(estado as string, 10),
                    idUsuario: idUActual
                },
            });

            await tx.historialMedico.create({
                data: {
                    historialMascotaId: mascotaCreada.id,
                    estado: 1,
                    idUsuario: idUActual,
                },
            });

            return mascotaCreada;
        });
        return { success: "Mascota y Historial Médico Registrados Correctamente!" };
    } catch (error) {
        console.error("Error al registrar mascota y historial médico:", error);
        return { error: "Ocurrió un error al registrar la mascota y su historial médico." };
    }
};

export const registrarMascotaConImagen = async (formMascota: FormData) => {
    try {
      const archivo = formMascota.get("archivo") as File | null;
      const nombre = formatearNombre(formMascota.get('nombre') as string) as string;
      const especie = formMascota.get('especie') as TipoMascota;
      const raza = formMascota.get('raza') as string;
      const fechaNacimiento = new Date(formMascota.get('fechaNacimiento') as string);
      const sexo = formMascota.get('sexo') as Sexo;
      const detalles = formatearDetalle(formMascota.get('detalles') as string) as string;
      const idPropietario = formMascota.get('idPropietario') ? parseInt(formMascota.get('idPropietario') as string, 10) : undefined;
      const peso = parseFloat(formMascota.get('peso') as string);
      const esterilizado = formMascota.get('esterilizado') === 'true';
      const estado = parseInt(formMascota.get('estado') as string, 10);

      let rutaImagen: string | null = null;
  
      if (archivo) {
        const nombreUnico = `${uuidv4()}_${archivo.name}`;
        const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'mascotas', nombreUnico);
        await fs.ensureDir(path.dirname(rutadeAlmacenamiento));
  
        const buffer = Buffer.from(await archivo.arrayBuffer());
        await fs.writeFile(rutadeAlmacenamiento, buffer);
        rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/mascotas/${nombreUnico}`;
      }
  
      const idUActual = await usuarioIdActual();
      const mascota = await db.$transaction(async (tx) => {
        const mascotaCreada = await tx.mascota.create({
          data: {
            nombre,
            especie,
            raza,
            fechaNacimiento,
            sexo,
            detalles,
            idPropietario,
            peso,
            esterilizado,
            estado,
            imagen: rutaImagen,
            idUsuario: idUActual
          },
        });
  
        await tx.historialMedico.create({
          data: {
            historialMascotaId: mascotaCreada.id,
            estado: 1,
            idUsuario: idUActual,
          },
        });
  
        return mascotaCreada;
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
        // const idUActual = await usuarioIdActual();
        // const mascotaActualizada = await db.mascota.update({
        //     where: {
        //         id: idMascota,
        //     },
        //     data: {
        //         ...values,
        //         idUsuario: idUActual,
        //     },
        // });

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
