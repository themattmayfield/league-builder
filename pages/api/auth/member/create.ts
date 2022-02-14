import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { hashPassword } from 'lib/auth/passwords'
import { prisma } from 'backend/prisma'

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

    if (maybeUser) {
      return res.status(200).json({
        message: 'Member found.',
        data: maybeUser
      })
    }

    if (!maybeUser) {
      if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) {
        return res.status(200).json({ statusCode: 500, message: 'Missing Details' })
        // throw new Error('Missing Details')
      }
      const newMember = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: 'user'
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

      return res.status(200).json({
        message: 'Member created.',
        data: newMember
      })
    }
  } catch (error: any) {
    console.error('[api] auth/member/create', error)
    return res.status(500).json({ statusCode: 500, message: error.message })
  }
}

export default nc().post(post)
