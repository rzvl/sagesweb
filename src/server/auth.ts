import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { loginSchema } from '@/lib/validations'
import { emailNotVerifiedMessage } from '@/lib/constants'
import { eq } from 'drizzle-orm'
import { users } from './db/schema'

const config = {
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
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
        const { email, password } = await loginSchema.parseAsync(credentials)

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
          throw new Error('incorrect email or password!')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          throw new Error('invalid email or password!')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
      }
      if (token.email && typeof token.provider === 'string') {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, token?.email),
        })

        if (existingUser) {
          session.user.username = existingUser.username
          session.user.role = existingUser.role

          if (!existingUser.authProvider) {
            await db
              .update(users)
              .set({ authProvider: token?.provider })
              .where(eq(users.email, token.email))
          }
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
