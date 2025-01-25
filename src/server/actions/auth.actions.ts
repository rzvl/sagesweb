'use server'

import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import { z } from 'zod'
import { loginSchema, signupSchema } from '@/lib/validations'
import { signIn } from '@/server/auth'
import {
  addUser,
  getUserByEmail,
  updateUserVerification,
} from '@/server/data/user'
import {
  deleteVerificationToken,
  generateVerificationToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from '@/server/data/token'
import { TResponse } from '@/lib/types'
import VerificationEmail from '@/components/email-templates/verification-eamil'
import { BASE_URL } from '@/lib/constants'

async function signup(
  values: z.infer<typeof signupSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = signupSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new Error('Invalid credentials')
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      if (!existingUser.emailVerified) {
        return await sendVerificationEmail(email)
      }
      throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await addUser({
      email,
      password: hashedPassword,
    })

    return await sendVerificationEmail(email)
  } catch (error) {
    if (error instanceof Error) {
      return { error: (error as Error).message }
    } else {
      return { error: 'Something went wrong' }
    }
  }
}

async function login(values: z.infer<typeof loginSchema>): Promise<TResponse> {
  try {
    await signIn('credentials', { ...values, redirect: false })

    return { success: 'Login successful' }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || 'Something went wrong' }
    }
    return { error: 'An unexpected error occurred' }
  }
}

async function sendVerificationEmail(email: string): Promise<TResponse> {
  try {
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
      const isFiveMinutesPast =
        Date.now() > 5 * 60000 + existingToken.sentAt.getTime()

      if (!isFiveMinutesPast) {
        throw new Error(
          'You can only request a verification email every 5 minutes.',
        )
      }
      await deleteVerificationToken(existingToken.token)
    }

    const { token } = await generateVerificationToken(email)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const url = `${BASE_URL}/verify-email?token=${token}`

    await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Confirm your SagesWeb account',
      react: VerificationEmail({ url }),
    })

    return { success: 'Verification email sent!' }
  } catch (error) {
    if (error instanceof Error) {
      return { error: (error as Error).message }
    } else {
      return { error: 'Something went wrong' }
    }
  }
}

async function resendVerificationEmail(email: string): Promise<TResponse> {
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    throw new Error('User not found')
  }

  if (existingUser.emailVerified) {
    throw new Error('Email already verified')
  }

  return sendVerificationEmail(email)
}

async function verifyEmail(token: string | null): Promise<TResponse> {
  try {
    if (!token) {
      throw new Error(
        'Token not found. Please use the link in your email to verify your email.',
      )
    }

    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
      throw new Error(
        'Invalid token. Please use the link in your email to verify your email.',
      )
    }

    const isTokenExpired =
      existingToken.sentAt.getTime() < Date.now() - 1000 * 3600 * 24

    if (isTokenExpired) {
      await deleteVerificationToken(existingToken.token)
      throw new Error(
        'Token has expired. Please use the button below to get a new verification email.',
      )
    }

    const user = await getUserByEmail(existingToken.email)

    if (!user) {
      await deleteVerificationToken(existingToken.token)
      throw new Error('User not found. You need to create an account first.')
    }

    if (user.emailVerified) {
      await deleteVerificationToken(existingToken.token)
      return { success: 'Your email is already verified!' }
    }

    await deleteVerificationToken(existingToken.token)
    await updateUserVerification(user.id)

    return { success: 'Email verified successfully!' }
  } catch (error) {
    if (error instanceof Error) {
      return { error: (error as Error).message }
    } else {
      return { error: 'Something went wrong' }
    }
  }
}

export {
  resendVerificationEmail,
  sendVerificationEmail,
  signup,
  login,
  verifyEmail,
}
