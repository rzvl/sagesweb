import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { getUserByEmail } from '@/server/data/user'
import { loginSchema } from '@/lib/validations'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
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
          throw new Error('User not found! Please create an account first.')
        }
        if (!user.emailVerified) {
          // if you change below message, change it in the logni-form.tsx too
          throw new Error('Email not verified')
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
})
