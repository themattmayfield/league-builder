import * as trpc from '@trpc/server'
import { z } from 'zod'
import { prisma } from './prisma'
import { useSession } from 'next-auth/react'

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
      const data = await prisma.league.findMany({
        include: { members: true },
        where: {
          adminId: input.userId
        }
      })

      const leagues = data.map((league) => ({ ...league, members: league.members.length }))

      return { leagues }
    }
  })
  .query('get-leagueMembers', {
    input: z.object({
      leagueId: z.string()
    }),
    async resolve({ input }) {
      const members = await prisma.leagueMember.findMany({
        include: { member: true },
        where: {
          leagueId: input.leagueId
        }
      })

      return { members }
    }
  })
  .mutation('create-league', {
    input: z.object({
      name: z.string(),
      admin: z.object({
        id: z.string(),
        email: z.string()
      })
      // votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const league = await prisma.league.create({
        data: {
          name: input.name,
          adminId: input.admin.id,
          members: {
            create: [
              {
                createdBy: input.admin.email as string,
                member: {
                  connect: {
                    id: input.admin.id
                  }
                }
              }
            ]
          }
        }
      })
      return { success: true, league: league }
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter
