import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { users } from '../utils/dummy'
import { hashPassword } from '../lib/auth/passwords'

// npx prisma db seed
const prisma = new PrismaClient()

const main = async () => {
  try {
    const encryptedPassword = await hash('password1234', 12)
    const userData = users.map((user) => ({ ...user, password: encryptedPassword }))

    // const response = await prisma.user.createMany({
    //   data: userData
    // })

    // Create Users
    const userIDs = await Promise.all(
      users.map(async (user) => {
        const { id } = await prisma.user.create({
          data: user
        })
        return id
      })
    )

    // Create Admin (me)
    const admin = await prisma.user.create({
      data: {
        email: 'mattmayf411@gmail.com',
        firstName: 'Matthew',
        lastName: 'Mayfield',
        password: await hashPassword('qqqqqqqq'),
        role: 'admin'
      },
      select: {
        id: true,
        email: true
      }
    })

    const leagueMemberCreate = userIDs.map((id) => ({
      createdBy: admin.email as string,
      member: {
        connect: {
          id: id
        }
      }
    }))

    // Create League
    await prisma.league.create({
      data: {
        name: 'Cool League',
        adminId: admin.id,
        members: {
          create: [
            ...leagueMemberCreate,
            {
              createdBy: admin.email as string,
              member: {
                connect: {
                  id: admin.id
                }
              }
            }
          ]
        }
      }
    })

    // const userIDs = users.map(async (user) => {
    //   const response = await prisma.user.create({
    //     data: user
    //   })
    //   return await response
    // })

    // const league = await prisma.league.create({
    //   data: {
    //     name: 'Cool League',
    //     adminId: admin.id,
    //     members: {
    //       create: [
    //         {
    //           createdBy: admin.email as string,
    //           member: {
    //             connect: {
    //               id: admin.id
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   }
    // })

    // await prisma.user.upsert({
    //   where: { email: 'a@a.com' },
    //   update: {},
    //   create: {
    //     email: 'a@a.com',
    //     firstName: 'Alice',
    //     lastName: 'Alice',
    //     password: encryptedPassword
    //   }
    // })
  } catch (error) {
    console.log(error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
