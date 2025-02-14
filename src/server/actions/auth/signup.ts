'use server'

import bcrypt from 'bcryptjs'
import { signupSchema } from '@/lib/validations'
import type { SignupSchema } from '@/lib/validations'
import { addUser, getUserByEmail } from '@/server/data/user'
import { TResponse } from '@/lib/types'
import sendVerificationEmail from './send-verification-email'

export default async function signup(values: SignupSchema): Promise<TResponse> {
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

    await addUser({
      email,
      password: hashedPassword,
      authProvider: 'credentials',
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
