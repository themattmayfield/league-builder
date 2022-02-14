import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verifyPassword, hashPassword } from 'lib/auth/passwords'
import { Session } from 'lib/auth/session'
import { prisma } from 'backend/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // Error code passed in query string as ?error=
    signOut: '/'
  },
  providers: [
    CredentialsProvider({
      id: 'app-login',
      name: 'App Login',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your super secure password'
        }
      },
      async authorize(credentials) {
        try {
          let maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email
            },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
              role: true
            }
          })

          if (!maybeUser) {
            if (!credentials?.password || !credentials?.email) {
              throw new Error('Email or password missing.')
            }

            throw new Error('No user found.')
          } else {
            const isValid = await verifyPassword(credentials?.password as string, maybeUser.password as string)

            if (!isValid) {
              throw new Error('Invalid Credentials')
            }
          }

          return {
            id: maybeUser?.id,
            email: maybeUser?.email,
            firstName: maybeUser?.firstName,
            lastName: maybeUser?.lastName,
            role: maybeUser?.role
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },
    async session({ session, token, user }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string
        }
      }
      console.log('sess??', sess)

      return sess
    }
  }
})
