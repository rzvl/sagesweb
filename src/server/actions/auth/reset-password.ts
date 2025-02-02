'use server'

import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { getUserByEmail, updateUserVerification } from '@/server/data/user'
import { resetPasswordSchema } from '@/lib/validations'
import type { ResetPasswordSchema } from '@/lib/validations'
import { deleteToken, getTokenByToken } from '@/server/data/token'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'

export default async function resetPassword(values: ResetPasswordSchema) {
  const validatedFields = resetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error('Invalid credentials')
  }

  const { password, token } = validatedFields.data

  try {
    if (!token) {
      throw new Error(
        'Token not found. Please use the link in your email to verify your email.',
      )
    }

    const existingToken = await getTokenByToken(token)

    if (!existingToken) {
      throw new Error(
        'Invalid token. Please use the link in your email to verify your email.',
      )
    }

    const isTokenExpired =
      existingToken.sentAt.getTime() < Date.now() - 1000 * 3600 * 24

    if (isTokenExpired) {
      await deleteToken(existingToken.token)
      throw new Error(
        'Token has expired. Please use the button below to get a new verification email.',
      )
    }

    const user = await getUserByEmail(existingToken.email)

    if (!user) {
      await deleteToken(existingToken.token)
      throw new Error('User not found. You need to create an account first.')
    }

    if (!user.emailVerified) {
      await updateUserVerification(user.id)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await deleteToken(existingToken.token)
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
