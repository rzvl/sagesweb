'use server'

import { signIn } from '@/server/auth'
import { type Login } from '@/lib/validations/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

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
          return { error: error.cause?.err?.message || 'Something went wrong' }
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

export { loginWithEmail, loginWithOAuth }
