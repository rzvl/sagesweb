'use server'

import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
import { signIn } from '@/server/auth'
import { type Login } from '@/lib/validations/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import {
  EMAIL_NOT_VERIFIED_MESSAGE,
  TWO_FACTOR_EMAIL_SENT_MESSAGE,
} from '@/lib/constants'
import { getUserByEmail } from '@/server/data/user'
import { deleteToken, getTokenByEmail } from '@/server/data/token'
import { sendTwoFactorEmail } from './send-two-factor-email'

async function loginWithEmail(values: Login) {
  try {
    await signIn('credentials', {
      ...values,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: error.cause?.err?.message }
      }
    }

    throw error
  }
}

async function loginWithOAuth(provider: 'google' | 'apple') {
  try {
    await signIn(provider, { redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: error.cause?.err?.message || 'Something went wrong' }
      }
    }

    throw error
  }
}

async function authorizeCredentials(credentials: Login) {
  const { email, password, code } = credentials

  const user = await getUserByEmail(email)

  if (!user) {
    throw new Error('User not found! Please sign up first.')
  }
  if (!user.emailVerified) {
    throw new Error(EMAIL_NOT_VERIFIED_MESSAGE)
  }
  if (!user.password) {
    throw new Error(
      'It looks like you signed up using Google or Apple. Please log in with your OAuth provider instead, or use a different email and password.',
    )
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid email or password!')
  }

  if (user.twoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTokenByEmail(email, 'twoFactorAuth')

      if (!twoFactorToken) {
        throw new Error('2FA code was not found!')
      }

      const hasExpired = twoFactorToken.expiresAt < new Date()
      if (hasExpired) {
        await deleteToken(twoFactorToken.token, 'twoFactorAuth')
        throw new Error('2FA code has expired!')
      }

      if (twoFactorToken.token !== code) {
        await deleteToken(twoFactorToken.token, 'twoFactorAuth')
        throw new Error('Invalid 2FA code! Please try again.')
      }

      await deleteToken(twoFactorToken.token, 'twoFactorAuth')
    } else {
      const response = await sendTwoFactorEmail(user.email)
      if (response.success) {
        throw new Error(TWO_FACTOR_EMAIL_SENT_MESSAGE)
      } else {
        throw new Error(response.message)
      }
    }
  }

  return user
}

export { loginWithEmail, loginWithOAuth, authorizeCredentials }
