import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type DefaultSessionUser = NonNullable<DefaultSession['user']>

  type SessionUser = DefaultSessionUser & {
    id: string
    role: string
  }

  export type Session = DefaultSession & {
    user?: SessionUser
  }

  interface Session {
    user?: SessionUser
  }
}
