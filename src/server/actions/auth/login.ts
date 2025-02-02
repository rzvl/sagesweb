'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/server/auth'
import type { LoginSchema } from '@/lib/validations'
import { TResponse } from '@/lib/types'

export default async function login(values: LoginSchema): Promise<TResponse> {
  try {
    await signIn('credentials', { ...values, redirect: false })

    return { success: true, message: 'Login successful' }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.cause?.err?.message || 'Something went wrong',
      }
    }
    return { success: false, message: 'An unexpected error occurred' }
  }
}
