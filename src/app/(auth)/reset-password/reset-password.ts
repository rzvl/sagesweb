'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getUserByEmail, updateUser } from '@/server/data/user'
import { deleteToken, getTokenByToken } from '@/server/data/token'
import { db } from '@/server/db'
import { users } from '@/server/db/schema/users'
import { TResponse } from '@/lib/types'
import { resetPasswordSchema } from './schema'

export async function resetPassword(
  values: z.infer<typeof resetPasswordSchema>,
): Promise<TResponse> {
  const validatedFields = resetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid credentials' }
  }

  const { password, token } = validatedFields.data

  try {
    if (!token) {
      return {
        success: false,
        message:
          'Token not found. Please use the link in your email to verify your email.',
      }
    }

    const existingToken = await getTokenByToken(token, 'passwordReset')

    if (!existingToken) {
      return {
        success: false,
        message:
          'Invalid token. Please use the link in your email to verify your email.',
      }
    }

    const isTokenExpired = existingToken.expiresAt.getTime() < Date.now()

    if (isTokenExpired) {
      await deleteToken(existingToken.token, 'passwordReset')
      return {
        success: false,
        message:
          'Token has expired. Please use the button below to get a new verification email.',
      }
    }

    const user = await getUserByEmail(existingToken.email)

    if (!user) {
      await deleteToken(existingToken.token, 'passwordReset')
      return {
        success: false,
        message: 'User not found. You need to create an account first.',
      }
    }

    if (!user.emailVerified) {
      await updateUser(user.id, { emailVerified: new Date() })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await deleteToken(existingToken.token, 'passwordReset')
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id))

    return {
      success: true,
      message:
        'Password Updated Successfully! You can now log in with your new password.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
