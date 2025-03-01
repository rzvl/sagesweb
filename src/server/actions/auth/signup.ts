'use server'

import bcrypt from 'bcryptjs'
import { type Signup, signupSchema } from '@/lib/validations/auth'
import { getUserByEmail } from '@/server/data/user'
import { TResponse } from '@/lib/types'
import { sendVerificationEmail } from './send-verification-email'
import { db } from '@/server/db'
import { users } from '@/server/db/schema/users'

export default async function signup(values: Signup): Promise<TResponse> {
  try {
    const validatedFields = signupSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new Error('Invalid credentials')
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      if (!existingUser.emailVerified) {
        return await sendVerificationEmail(email)
      }
      throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      email,
      password: hashedPassword,
    })

    return await sendVerificationEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
