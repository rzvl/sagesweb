'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { env } from '@/env/server'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { TResponse } from '@/lib/types'
import {
  deleteToken,
  generateToken,
  getTokenByEmail,
} from '@/server/data/token'
import { BASE_URL } from '@/lib/constants'
import { ResetPasswordEmail } from '@/components/email-templates/reset-password-email'
import { getUserByEmail } from '@/server/data/user'

export async function sendPasswordResetEmail(
  values: z.infer<typeof forgotPasswordSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = forgotPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
      return { success: false, message: 'Invalid credentials' }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return {
        success: false,
        message: 'We couldn’t find an account with that email address.',
      }
    }

    const existingToken = await getTokenByEmail(email, 'passwordReset')

    if (existingToken) {
      const isFiveMinutesPast =
        Date.now() > 5 * 60000 + existingToken.createdAt.getTime()

      if (!isFiveMinutesPast) {
        return {
          success: false,
          message:
            'You can only request a reset password email every 5 minutes.',
        }
      }
      await deleteToken(existingToken.token, 'passwordReset')
    }

    const { token } = await generateToken(email, 'passwordReset')

    const resend = new Resend(env.RESEND_API_KEY)
    const url = `${BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Reset your SagesWeb password',
      react: ResetPasswordEmail({ url }),
    })

    return {
      success: true,
      message:
        'A reset link has been sent to your email. Please check your inbox.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
