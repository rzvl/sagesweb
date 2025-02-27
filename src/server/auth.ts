import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { loginSchema } from '@/lib/validations/auth'
import { emailNotVerifiedMessage } from '@/lib/constants'
import { eq } from 'drizzle-orm'
import { users } from './db/schema/users'

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
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          throw new Error('Invalid credentials!')
        }

        const { email, password } = validatedFields.data

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        })

        if (!user) {
          throw new Error('User not found! Please sign up first.')
        }
        if (!user.emailVerified) {
          throw new Error(emailNotVerifiedMessage)
        }
        if (!user.password) {
          throw new Error(
            'It looks like you signed up using Google or Apple. Please log in with your OAuth provider instead, or use a different email and password.',
          )
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          throw new Error('Invalid email or password!')
        }

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
