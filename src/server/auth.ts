import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { getUserByEmail } from '@/server/data/user'
import { loginSchema } from '@/lib/validations'
import { emailNotVerifiedMessage } from '@/lib/constants'

const config = {
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new Error('Invalid credentials!')
        }

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
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
  // callbacks: {
  //   authorized: ({ request }) => {
  //     const isTryingToAccess = request.nextUrl.pathname.includes('/app')

  //     if (isTryingToAccess) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   },
  // },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
