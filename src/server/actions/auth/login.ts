'use server'

import { signIn } from '@/server/auth'
import type { LoginSchema } from '@/lib/validations'

async function loginWithEmail(values: LoginSchema) {
  await signIn('credentials', { ...values, redirectTo: '/api/login' })
}

async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/api/login' })
}

async function loginWithApple() {
  await signIn('apple', { redirectTo: '/api/login' })
}

export { loginWithEmail, loginWithGoogle, loginWithApple }
