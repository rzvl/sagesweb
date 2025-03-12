'use server'

import { getUserByEmail, updateUser } from '@/server/data/user'
import { deleteToken, getTokenByToken } from '@/server/data/token'
import { TResponse } from '@/lib/types'

export async function verifyEmail(token: string | null): Promise<TResponse> {
  try {
    if (!token) {
      return {
        success: false,
        message:
          'Token not found. Please use the link in your email to verify your email.',
      }
    }

    const existingToken = await getTokenByToken(token, 'emailVerification')

    if (!existingToken) {
      return {
        success: false,
        message:
          'Invalid token. Please use the link in your email to verify your email.',
      }
    }

    const isTokenExpired = existingToken.expiresAt.getTime() < Date.now()

    if (isTokenExpired) {
      await deleteToken(existingToken.token, 'emailVerification')
      return {
        success: false,
        message:
          'Token has expired. Please use the button below to get a new verification email.',
      }
    }

    const user = await getUserByEmail(existingToken.email)

    if (!user) {
      await deleteToken(existingToken.token, 'emailVerification')
      return {
        success: false,
        message: 'User not found. You need to create an account first.',
      }
    }

    if (user.emailVerified) {
      await deleteToken(existingToken.token, 'emailVerification')
      return { success: true, message: 'Email already verified.' }
    }

    await deleteToken(existingToken.token, 'emailVerification')
    await updateUser(user.id, { emailVerified: new Date() })

    return { success: true, message: 'Email verified successfully.' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong.' }
    }
  }
}
