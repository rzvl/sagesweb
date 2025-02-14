'use server'

import { getUserByEmail, updateUserVerification } from '@/server/data/user'
import { deleteToken, getTokenByToken } from '@/server/data/token'

export default async function verifyEmail(token: string | null) {
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

    if (user.emailVerified) {
      await deleteToken(existingToken.token)
      return { success: true, message: 'Email already verified.' }
    }

    await deleteToken(existingToken.token)
    await updateUserVerification(user.id)

    return { success: true, message: 'Email verified successfully.' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong.' }
    }
  }
}
