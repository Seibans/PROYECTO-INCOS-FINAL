import {PrismaClient} from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

//En produccion no se inicializa debido al hot reload de Next.js
//export const prisma = globalThis.prisma;



// USANDO AcceleratedAnimation, PERO LAS CONSULTAS NO SIRVEN
// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

// declare global {
//   var prisma: ReturnType<typeof getPrismaClient> | undefined;
// }

// function getPrismaClient() {
//   return new PrismaClient().$extends(withAccelerate());
// }

// export const db = globalThis.prisma || getPrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = db;
// }