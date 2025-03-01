'use server'

import { Resend } from 'resend'
import {
  deleteToken,
  generateToken,
  getTokenByEmail,
} from '@/server/data/token'
import { TResponse } from '@/lib/types'
import { getUserByEmail } from '@/server/data/user'
import TwoFactorAuthEmail from '@/components/email-templates/two-factor-auth-email'

async function sendTwoFactorEmail(email: string): Promise<TResponse> {
  try {
    const existingToken = await getTokenByEmail(email, 'twoFactorAuth')
    if (existingToken) {
      const isOneMinutePast =
        Date.now() > 60 * 1000 + existingToken.sentAt.getTime()

      if (!isOneMinutePast) {
        throw new Error('You can only request a 2FA email every 1 minute.')
      }
      await deleteToken(existingToken.token, 'twoFactorAuth')
    }

    const { token } = await generateToken(email, 'twoFactorAuth')

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Your 2FA Code for Secure Login',
      react: TwoFactorAuthEmail({ code: token }),
    })

    return { success: true, message: '2FA code was sent to your email!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}

async function resendTwoFactorEmail(email: string): Promise<TResponse> {
  try {
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      throw new Error('User not found')
    }

    return sendTwoFactorEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}

export { sendTwoFactorEmail, resendTwoFactorEmail }
