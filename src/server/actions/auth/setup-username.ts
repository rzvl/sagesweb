'use server'

import { TResponse } from '@/lib/types'
import { type UsernameSetup, usernameSetupSchema } from '@/lib/validations/auth'
import {
  getUserByEmail,
  getUserByUsername,
  updateUsername,
} from '@/server/data/user'

async function setupUsername(values: UsernameSetup): Promise<TResponse> {
  try {
    const validatedFields = await usernameSetupSchema.safeParseAsync(values)

    if (!validatedFields.success) {
      throw new Error('Invalid username')
    }

    const { username, email } = validatedFields.data

    if (!email) {
      throw new Error('Email was not provided')
    }

    if (!(await checkUsernameAvailability(username))) {
      throw new Error('Username is already taken')
    }

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      throw new Error('User not found')
    }

    if (existingUser.username) {
      throw new Error('Username already set')
    }

    await updateUsername(existingUser.id, username)

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
