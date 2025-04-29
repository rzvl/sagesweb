'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import {
  EMAIL_NOT_VERIFIED_MESSAGE,
  TWO_FACTOR_EMAIL_SENT_MESSAGE,
} from '@/lib/constants'
import { getUserByEmail } from '@/server/data/user'
import { deleteToken, getTokenByEmail } from '@/server/data/token'
import { sendTwoFactorEmail } from './send-two-factor-email'
import { createUserSession } from '@/server/data/session'
import { TResponse } from '@/lib/types'
import { OAuthProvider } from '@/server/db/schema/users'
import { getOAuthClient } from '@/server/oauth/base'
import { logInSchema } from '../schema'

export async function login(
  values: z.infer<typeof logInSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = logInSchema.safeParse(values)

    if (!validatedFields.success) {
      return { success: false, message: 'Invalid credentials' }
    }

    const { email, password, code } = validatedFields.data

    const user = await getUserByEmail(email)

    if (!user || !user.password) {
      return {
        success: false,
        message: 'Invalid email or password!',
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return { success: false, message: 'Invalid email or password!' }
    }

    if (!user.emailVerified) {
      return { success: false, message: EMAIL_NOT_VERIFIED_MESSAGE }
    }

    if (user.isTwoFactorEnabled) {
      if (code) {
        const twoFactorToken = await getTokenByEmail(email, 'twoFactorAuth')

        if (!twoFactorToken) {
          return { success: false, message: '2FA code was not found!' }
        }

        const hasExpired = twoFactorToken.expiresAt < new Date()
        if (hasExpired) {
          await deleteToken(twoFactorToken.token, 'twoFactorAuth')
          return { success: false, message: '2FA code has expired!' }
        }

        if (twoFactorToken.token !== code) {
          await deleteToken(twoFactorToken.token, 'twoFactorAuth')
          return {
            success: false,
            message: 'Invalid 2FA code! Please try again.',
          }
        }

        await deleteToken(twoFactorToken.token, 'twoFactorAuth')
      } else {
        const res = await sendTwoFactorEmail(user.email)
        if (res.success) {
          return { success: false, message: TWO_FACTOR_EMAIL_SENT_MESSAGE }
        } else {
          return { success: false, message: res.message }
        }
      }
    }

    await createUserSession(
      {
        id: user.id,
        role: user.role,
      },
      await cookies(),
    )
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong!' }
    }
  }

  redirect(DEFAULT_LOGIN_REDIRECT)
}

export async function oAuthLogin(
  provider: OAuthProvider,
): Promise<TResponse<string>> {
  try {
    const oAuthClient = getOAuthClient(provider)
    const url = await oAuthClient.createAuthUrl(await cookies())
    return { success: true, message: 'Success!', data: url }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong!' }
    }
  }
}
