'use server'

import { Resend } from 'resend'
import { env } from '@/env/server'
import {
  deleteToken,
  generateToken,
  getTokenByEmail,
} from '@/server/data/token'
import { getUserByEmail } from '@/server/data/user'
import { TwoFactorAuthEmail } from '@/components/email-templates/two-factor-auth-email'
import { TResponse } from '@/lib/types'

export async function sendTwoFactorEmail(email: string): Promise<TResponse> {
  try {
    const existingToken = await getTokenByEmail(email, 'twoFactorAuth')
    if (existingToken) {
      const isOneMinutePast =
        Date.now() > 60 * 1000 + existingToken.createdAt.getTime()

      if (!isOneMinutePast) {
        return {
          success: false,
          message: 'You can only request a 2FA email every 1 minute.',
        }
      }
      await deleteToken(existingToken.token, 'twoFactorAuth')
    }

    const { token } = await generateToken(email, 'twoFactorAuth')

    const resend = new Resend(env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Your 2FA Code for Secure Login',
      react: TwoFactorAuthEmail({ code: token }),
    })

    return { success: true, message: '2FA code was sent to your email!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}

export async function resendTwoFactorEmail(email: string): Promise<TResponse> {
  try {
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      return { success: false, message: 'User not found!' }
    }

    return sendTwoFactorEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
