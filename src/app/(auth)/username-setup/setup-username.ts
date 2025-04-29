'use server'

import { z } from 'zod'
import { TResponse } from '@/lib/types'
import {
  getUserByEmail,
  getUserByUsername,
  updateUser,
} from '@/server/data/user'
import { usernameSetupSchema } from './schema'

async function setupUsername(
  values: z.infer<typeof usernameSetupSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = await usernameSetupSchema.safeParseAsync(values)

    if (!validatedFields.success) {
      return { success: false, message: 'Invalid credentials' }
    }

    const { username, email } = validatedFields.data

    if (!email) {
      return { success: false, message: 'Email was not provided' }
    }

    if (!(await checkUsernameAvailability(username))) {
      return { success: false, message: 'Username is already taken' }
    }

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return { success: false, message: 'User not found' }
    }

    if (existingUser.username) {
      return { success: false, message: 'Username already set' }
    }

    await updateUser(existingUser.id, { username })

    return { success: true, message: 'Username set successfully' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}

async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    const existingUser = await getUserByUsername(username)
    return !existingUser
  } catch {
    return false
  }
}

export { checkUsernameAvailability, setupUsername }
