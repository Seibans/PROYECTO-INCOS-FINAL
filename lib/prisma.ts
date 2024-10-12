// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export const db = prisma;

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = prisma;
// }


import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma