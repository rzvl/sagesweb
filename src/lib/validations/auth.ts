import { z } from 'zod'
import { checkUsernameAvailability } from '@/server/actions/auth'

export const logInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
  password: z.string().trim().min(1, { message: 'Password is required' }),
  code: z.string().optional(),
})

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(320, { message: 'Email must be less than 320 characters' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(64, { message: 'Password must be less than 64 characters' }),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(320, { message: 'Email must be less than 320 characters' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(64, { message: 'Password must be less than 64 characters' }),
  token: z
    .string()
    .min(1, { message: 'Token is required' })
    .nullable()
    .optional(),
})

export const usernameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Username is required' })
  .min(3, { message: 'Username must be at least 3 characters' })
  .max(20, { message: 'Username must be at most 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
  .transform((val) => val.toLowerCase())
  .refine(async (username) => await checkUsernameAvailability(username), {
    message: 'Username is already taken',
  })

export const usernameSetupSchema = z.object({
  email: z.string(),
  username: usernameSchema,
})
