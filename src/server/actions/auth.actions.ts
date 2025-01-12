'use server'

import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import { loginSchema, signupSchema } from '@/lib/validations'
import { addUser, getUserByEmail } from '@/data/user'
import {
  deleteVerificationToken,
  generateVerificationToken,
  getVerificationTokenByEmail,
} from '@/data/token'
import { ActionResponse, AuthFormData } from '@/lib/types'
import VerificationEmail from '@/components/email-templates/vrf-eamil'
import { baseUrl } from '@/lib/utils'

async function signup(values: AuthFormData): Promise<ActionResponse> {
  const validatedFields = signupSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid credentials!',
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
        error: 'Email already exists',
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
      error: (error as Error).message,
    }
  }
}

async function login(values: AuthFormData) {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid credentials!',
    }
  }

  return { success: 'Login successful!' }

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

async function sendVerificationEmail(email: string) {
  try {
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
      const isOneMinutePast =
        new Date().getTime() - existingToken.sentAt.getTime() > 60000

      if (!isOneMinutePast) {
        return {
          error:
            'Email verification token has already been sent. Please try again in a minute.',
        }
      }
      await deleteVerificationToken(existingToken.token)
    }

    const { token } = await generateVerificationToken(email)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const url = `${baseUrl}/api/auth/verify?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'SagesWeb <hello@notifications.sagesweb.com>',
      to: email,
      subject: 'Confirm your SagesWeb account',
      react: VerificationEmail({ url }),
    })

    if (error) {
      console.log(error)
      return { error: 'Failed to send verification email', data: error }
    }

    return { success: 'Verification email sent!', data }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export { sendVerificationEmail, signup, login }
