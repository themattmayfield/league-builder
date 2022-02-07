import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { hashPassword } from 'lib/auth/passwords'
import prisma from 'backend/prisma'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body)

    let maybeUser = await prisma.user.findFirst({
      where: {
        email: req.body.email
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true
      }
    })

    if (!maybeUser) {
      if (!req.body.password || !req.body.email) {
        throw new Error('Invalid Credentials')
      }
      const admin = await prisma.user.create({
        data: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: await hashPassword(req.body.password),
          role: 'admin'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
          role: true
        }
      })

      await prisma.league.create({
        data: {
          name: req.body.leagueName,
          members: {
            create: [
              {
                role: 'admin',
                createdBy: admin.email,
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

      return res.status(200).json({
        message: 'Admin created.',
        data: admin
      })
    }

    await prisma.league.create({
      data: {
        name: req.body.leagueName,
        members: {
          create: [
            {
              role: 'admin',
              createdBy: maybeUser.email,
              member: {
                connect: {
                  id: maybeUser.id
                }
              }
            }
          ]
        }
      }
    })

    return res.status(200).json({
      message: 'Admin found.',
      data: maybeUser
    })
  } catch (error) {
    console.error('[api] auth/administrator/create', error)
    return res.status(500).json({ statusCode: 500, message: error.message })
  }
}

export default nc().post(post)
