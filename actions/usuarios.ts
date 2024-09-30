"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { usuarioIdActual } from "@/lib/auth";
import { UsuarioT } from "@/types";
import { ConfiguracionSchema } from "@/schemas";

export const obtenerUsuarios = async (): Promise<UsuarioT[]> => {
  const usuarioActualId = await usuarioIdActual();
  if (!usuarioActualId) {
    throw new Error('ID del usuario autenticado no está definido');
  }

  if (isNaN(usuarioActualId)) {
    throw new Error('ID del usuario autenticado no es un número válido');
  }

  const usuarios = await db.user.findMany({
    where: {
      id: {
        not: usuarioActualId,
      },
      estado: 1,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      apellidoPat: true,
      apellidoMat: true,
      ci: true,
      sexo: true,
      email: true,
      emailVerified: true,
      image: true,
      rol: true,
      celular: true,
      direccion: true,
      estado: true,
      authDobleFactor: true,
      createdAt: true,
      updatedAt: true,
      idUsuario: true
    },
  });
  return usuarios;
};

export const usuariosMascota = async (): Promise<any[]> => {
  const usuarioActualId = await usuarioIdActual();
  if (!usuarioActualId) {
    throw new Error('ID del usuario autenticado no está definido');
  }

  if (isNaN(usuarioActualId)) {
    throw new Error('ID del usuario autenticado no es un número válido');
  }

  const usuarios = await db.user.findMany({
    where: {
      id: {
        not: usuarioActualId,
      },
      estado: 1,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      apellidoPat: true,
      apellidoMat: true,
      ci: true,
      email: true,
      image: true,
      rol: true,
      celular: true,
    },
  });

  return usuarios.map(usuario => ({
    ...usuario,
    nombreCompleto: `${usuario.name} ${usuario.apellidoPat} ${usuario.apellidoMat}`.trim()
  }));
};

export const editarUsuario = async (values: z.infer<typeof ConfiguracionSchema>, idUsuario: number) => {
  const validatedFields = ConfiguracionSchema.safeParse(values);

  const usuarioActualId = await usuarioIdActual();
  if (!usuarioActualId) {
    throw new Error('ID del usuario autenticado no está definido');
  }

  if (isNaN(usuarioActualId)) {
    throw new Error('ID del usuario autenticado no es un número válido');
  }


  if (!validatedFields.success) {
      return { error: "Campos Inválidos!" };
  }
  // console.log(validatedFields)
  // console.log(idUsuario)
  const { name, apellidoPat, apellidoMat, ci, email, rol, celular, direccion, estado, authDobleFactor } = validatedFields.data;
  // console.log(name, apellidoPat, apellidoMat, ci, email, rol, celular, direccion, estado, authDobleFactor)
  // console.log(usuarioActualId)

  try {
    
    await db.user.update({
      where: {
        id: idUsuario
      },
      data: {
        ...values,
        idUsuario: usuarioActualId
      }
    })
    
    return { success: "Los Datos del Usuario fueron Actualizados Correctamente!" };
  } catch (error) {
    return { error: "Error al Actualizar los Datos del Usuario!" };
  }
};

export const deshabilitarUsuario = async (id: number) => {
  const usuarioActualId = await usuarioIdActual();
  if (!usuarioActualId) {
    throw new Error('ID del usuario autenticado no está definido');
  }

  if (isNaN(usuarioActualId)) {
    throw new Error('ID del usuario autenticado no es un número válido');
  }
  try {
    await db.user.update({
      where: { id },
      data: {
        estado: 0,
        idUsuario: usuarioActualId,
      },
    });

    return { success: "La Cuenta del Usuario fue Eliminada Correctamente" };
  } catch (error) {
    return { error: "Usuario no Encontrado o Error al Eliminar la Cuenta" };
  }
};