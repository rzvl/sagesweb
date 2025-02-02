'use server'

import { Resend } from 'resend'
import {
  deleteToken,
  generateToken,
  getTokenByEmail,
} from '@/server/data/token'
import { TResponse } from '@/lib/types'
import VerificationEmail from '@/components/email-templates/verification-email'
import { BASE_URL } from '@/lib/constants'

export default async function sendVerificationEmail(
  email: string,
): Promise<TResponse> {
  try {
    const existingToken = await getTokenByEmail(email, 'emailVerification')
    if (existingToken) {
      const isFiveMinutesPast =
        Date.now() > 5 * 60000 + existingToken.sentAt.getTime()

      if (!isFiveMinutesPast) {
        throw new Error(
          'You can only request a verification email every 5 minutes.',
        )
      }
      await deleteToken(existingToken.token)
    }

    const { token } = await generateToken(email, 'emailVerification')

    const resend = new Resend(process.env.RESEND_API_KEY)
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
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
