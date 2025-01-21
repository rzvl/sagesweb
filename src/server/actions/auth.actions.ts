'use server'

import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import { z } from 'zod'
import { loginSchema, signupSchema } from '@/lib/validations'
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
): Promise<TResponse<string>> {
  const validatedFields = signupSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      success: false,
      data: 'Invalid credentials!',
    }
  }

  const { email, password } = validatedFields.data

  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      if (!existingUser.emailVerified) {
        return await sendVerificationEmail(email)
      }
      return {
        success: false,
        data: 'Email already exists',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await addUser({
      email,
      password: hashedPassword,
    })

    return await sendVerificationEmail(email)
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message,
    }
  }
}

async function login(
  values: z.infer<typeof loginSchema>,
): Promise<TResponse<string>> {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      success: false,
      data: 'Invalid credentials!',
    }
  }

  return { success: true, data: 'Login successful!' }

  // const { email, password } = validatedFields.data

  // const existingUser = await db
  //   .select()
  //   .from(users)
  //   .where(eq(users.email, email))

  // if (existingUser) {
  //   return {
  //     errors: {
  //       email: 'Email already exists',
  //     },
  //   }
  // }
}

async function sendVerificationEmail(
  email: string,
): Promise<TResponse<string>> {
  try {
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
      const isFiveMinutesPast =
        Date.now() > 5 * 60000 + existingToken.sentAt.getTime()

      if (!isFiveMinutesPast) {
        return {
          success: false,
          data: 'You can only request a verification email every 5 minutes. Please try again later.',
        }
      }
      await deleteVerificationToken(existingToken.token)
    }

    const { token } = await generateVerificationToken(email)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const url = `${BASE_URL}/verify-email?token=${token}`

    const { error } = await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Confirm your SagesWeb account',
      react: VerificationEmail({ url }),
    })

    if (error) {
      return {
        success: false,
        data: 'Failed to send verification email',
      }
    }
    return { success: true, data: 'Verification email sent!' }
  } catch (error) {
    return { success: false, data: (error as Error).message }
  }
}

async function resendVerificationEmail(
  email: string,
): Promise<TResponse<string>> {
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return {
      success: false,
      data: 'User not found',
    }
  }

  if (existingUser.emailVerified) {
    return {
      success: false,
      data: 'Email already verified',
    }
  }

  return sendVerificationEmail(email)
}

async function verifyEmail(token: string | null): Promise<TResponse<string>> {
  if (!token) {
    return {
      success: false,
      data: 'Token not found. Please use the link in your email to verify your email.',
    }
  }

  try {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
      return {
        success: false,
        data: 'Invalid token. Please use the link in your email to verify your email.',
      }
    }

    const isTokenExpired =
      existingToken.sentAt.getTime() < Date.now() - 1000 * 3600 * 24

    if (isTokenExpired) {
      await deleteVerificationToken(existingToken.token)
      return {
        success: false,
        data: 'Token has expired. Please use the button below to get a new verification email.',
      }
    }

    const user = await getUserByEmail(existingToken.email)

    if (!user) {
      await deleteVerificationToken(existingToken.token)
      return {
        success: false,
        data: 'User not found. You need to create an account first.',
      }
    }

    if (user.emailVerified) {
      await deleteVerificationToken(existingToken.token)
      return {
        success: true,
        data: 'Your email is already verified!',
      }
    }

    await deleteVerificationToken(existingToken.token)
    await updateUserVerification(user.id)

    return {
      success: true,
      data: 'Email verified successfully!',
    }
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message,
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
