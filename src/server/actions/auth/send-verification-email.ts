'use server'

import { Resend } from 'resend'
import { env } from '@/env/server'
import {
  deleteToken,
  generateToken,
  getTokenByEmail,
} from '@/server/data/token'
import { VerificationEmail } from '@/components/email-templates/verification-email'
import { BASE_URL, EAMIL_IS_VERIFIED_MESSAGE } from '@/lib/constants'
import { getUserByEmail } from '@/server/data/user'
import { TResponse } from '@/lib/types'

export async function sendVerificationEmail(email: string): Promise<TResponse> {
  try {
    const existingToken = await getTokenByEmail(email, 'emailVerification')

    if (existingToken) {
      const isFiveMinutesPast =
        Date.now() > 5 * 60000 + existingToken.createdAt.getTime()

      if (!isFiveMinutesPast) {
        return {
          success: false,
          message: 'You can only request a verification email every 5 minutes.',
        }
      }
      await deleteToken(existingToken.token, 'emailVerification')
    }

    const { token } = await generateToken(email, 'emailVerification')

    const resend = new Resend(env.RESEND_API_KEY)
    const url = `${BASE_URL}/verify-email?token=${token}&email=${email}`

    await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Confirm your SagesWeb account',
      react: VerificationEmail({ url }),
    })

    return { success: true, message: 'Verification email sent!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}

export async function resendVerificationEmail(
  email: string,
): Promise<TResponse> {
  try {
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      return { success: false, message: 'User not found!' }
    }

    if (existingUser.emailVerified) {
      return { success: true, message: EAMIL_IS_VERIFIED_MESSAGE }
    }

    return sendVerificationEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
