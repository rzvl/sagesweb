'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getUserById } from '@/server/data/user'
import { db } from '@/server/db'
import { users } from '@/server/db/schema/users'
import { TResponse } from '@/lib/types'
import { changePasswordSchema } from './schema'

export async function changePassword(
  values: z.infer<typeof changePasswordSchema>,
): Promise<TResponse> {
  const validatedFields = changePasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid credentials' }
  }

  const { userId, currentPassword, newPassword } = validatedFields.data

  try {
    const user = await getUserById(userId)

    if (!user || !user.password) {
      return {
        success: false,
        message: 'user not found!',
      }
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!passwordMatch) {
      return { success: false, message: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id))

    return {
      success: true,
      message: 'Password changed successfully!',
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
