import { prisma } from '../backend/prisma'

const cleanupDatabase = () => {
  const propertyNames = Object.getOwnPropertyNames(prisma)
  const modelNames: string[] = propertyNames.filter((propertyName: string) => !propertyName.startsWith('_'))

  return Promise.all(modelNames.map((model) => (prisma as any)[model].deleteMany()))
}

cleanupDatabase()

// npm run ts-node scripts/cleartables.ts
