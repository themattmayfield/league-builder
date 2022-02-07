import prisma from '../backend/prisma'

const cleanupDatabase = () => {
  const propertyNames = Object.getOwnPropertyNames(prisma)
  const modelNames = propertyNames.filter((propertyName) => !propertyName.startsWith('_'))

  return Promise.all(modelNames.map((model) => prisma[model].deleteMany()))
}

cleanupDatabase()

// npm run ts-node scripts/cleartables.ts
