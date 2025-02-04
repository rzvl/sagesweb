'use server'

import { signIn } from '@/server/auth'
import type { LoginSchema } from '@/lib/validations'

async function loginWithEmail(values: LoginSchema) {
  await signIn('credentials', { ...values, redirectTo: '/' })
}

async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/' })
}

async function loginWithApple() {
  await signIn('apple', { redirectTo: '/' })
}

export { loginWithEmail, loginWithGoogle, loginWithApple }
