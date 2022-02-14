// import { PrismaClient } from "@prisma/client";

// export * from "@prisma/client";

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient({
//     errorFormat: "minimal",
//   });
// } else {
//   globalThis["prisma"] =
//     globalThis["prisma"] ||
//     new PrismaClient({
//       errorFormat: "pretty",
//     });
//   prisma = globalThis["prisma"];
// }

// export default prisma;

import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
