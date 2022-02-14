import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { hashPassword } from 'lib/auth/passwords'
import { prisma } from 'backend/prisma'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    if (maybeUser) {
      return res.status(200).json({ statusCode: 500, message: 'Email Taken' })
    }

    if (!maybeUser) {
      if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName || !req.body.leagueName) {
        return res.status(200).json({ statusCode: 500, message: 'Missing Details' })
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

      return res.status(200).json({
        message: 'Admin created.',
        data: admin
      })
    }
  } catch (error: any) {
    console.log('made it to error')

    console.error('[api] auth/administrator/create', error)
    return res.status(500).json({ statusCode: 500, message: error.message })
  }
}

export default nc().post(post)
