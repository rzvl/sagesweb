import { eq } from 'drizzle-orm'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { loginSchema } from '@/lib/validations/auth'
import { users } from '@/server/db/schema/users'
import { authorizeCredentials } from '@/server/actions/auth/login'

const config = {
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
    error: '/auth-error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          throw new Error('Invalid credentials!')
        }

        const user = await authorizeCredentials(validatedFields.data)
        return user
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db
          .update(users)
          .set({ emailVerified: new Date() })
          .where(eq(users.id, user.id))
      }
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }
        session.user.role = token.role
        session.user.username = token.username
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token?.sub),
      })

      if (!existingUser) {
        return token
      }

      token.username = existingUser.username
      token.role = existingUser.role

      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
