import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import prisma from './prisma'

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z.object({
      text: z.string()
    }),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`
      }
    }
  })
  .query('get-user', {
    input: z.object({
      userId: z.string()
    }),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({
        where: {
          id: input.userId
        }
      })

      return { user }
    }
  })
  .query('get-users', {
    async resolve() {
      const users = await prisma.user.findMany()

      return { users }
    }
  })
  .query('get-leagues', {
    input: z.object({
      userId: z.string()
    }),
    async resolve({ input }) {
      const leagues = await prisma.league.findMany({
        where: {
          members: {
            some: {
              userId: input.userId,
              role: 'admin'
            }
          }
        }
      })

      return { leagues }
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
})
