// "use server";
// //Esto es un server action
// import * as z from "zod";
// import { RegisterSchema } from "@/schemas";
// import bcrypt from "bcryptjs";
// import { db } from "@/lib/db";
// import { getUserByEmail } from "@/data/user";
// import { generateVerificationToken } from "@/lib/tokens";
// import { enviarCorreodeVerificacion } from "@/lib/mail";
// import { formatName } from "@/lib/formatearNombre";
// import {User} from "@prisma/client"

// export const obtenerUsuarios = async ():Promise<User[]> => {
// 	const usuarios = await db.$queryRaw<User[]>`
// 		SELECT id, nombre, correo, correoVerificado, imagen, rol, celular, autenticacionDobleFactor, creadoEn, actualizadoEn FROM usuario ORDER BY creadoEn DESC
// 	`;
// 	return usuarios;
// };









// "use server";

// import { db } from "@/lib/db";
// import { auth } from "@/auth";
// import { User } from "@prisma/client";

// export const obtenerUsuarios = async (): Promise<User[]> => {
//   const session = await auth();
//   const usuarioActualId = session?.user?.id;

//   const usuarios = await db.user.findMany({
//     where: {
//       id: {
//         not: usuarioActualId,
//       },
//     },
//     orderBy: {
//       creadoEn: 'desc',
//     },
//     select: {
//       id: true,
//       nombre: true,
//       correo: true,
//       correoVerificado: true,
//       imagen: true,
//       rol: true,
//       celular: true,
//       autenticacionDobleFactor: true,
//       creadoEn: true,
//       actualizadoEn: true,
//     },
//   });

//   return usuarios;
// };


"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { User } from "@prisma/client";

export const obtenerUsuarios = async (): Promise<User[]> => {
  const session = await auth();
  const usuarioActualIdStr = session?.user?.id;

  if (!usuarioActualIdStr) {
    throw new Error('ID del usuario autenticado no está definido');
  }

  const usuarioActualId = parseInt(usuarioActualIdStr, 10);

  if (isNaN(usuarioActualId)) {
    throw new Error('ID del usuario autenticado no es un número válido');
  }

  const usuarios = await db.user.findMany({
    where: {
      id: {
        not: usuarioActualId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
	  password: true,
      image: true,
      rol: true,
      celular: true,
      authDobleFactor: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return usuarios;
};
