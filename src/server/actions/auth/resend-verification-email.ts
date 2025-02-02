'use server'

import { getUserByEmail } from '@/server/data/user'
import { TResponse } from '@/lib/types'
import sendVerificationEmail from './send-verification-email'
import { emailIsVerifiedMessage } from '@/lib/constants'

export default async function resendVerificationEmail(
  email: string,
): Promise<TResponse> {
  try {
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      throw new Error('User not found')
    }

    if (existingUser.emailVerified) {
      return { success: true, message: emailIsVerifiedMessage }
    }

    return sendVerificationEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
