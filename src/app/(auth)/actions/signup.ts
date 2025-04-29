'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from './send-verification-email'
import { db } from '@/server/db'
import { users } from '@/server/db/schema/users'
import { TResponse } from '@/lib/types'
import { signupSchema } from '../schema'

export async function signup(
  values: z.infer<typeof signupSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = signupSchema.safeParse(values)

    if (!validatedFields.success) {
      return { success: false, message: 'Invalid credentials' }
    }

    const { email, password } = validatedFields.data

    const existingUser = await db.query.users.findFirst({
      columns: { email: true, emailVerified: true },
      where: eq(users.email, email),
    })

    if (existingUser) {
      if (!existingUser.emailVerified) {
        return await sendVerificationEmail(existingUser.email)
      }
      return {
        success: false,
        message: 'Account already exists for this email!',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      email,
      password: hashedPassword,
    })

    return await sendVerificationEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
