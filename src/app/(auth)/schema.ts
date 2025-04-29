import { z } from 'zod'

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
    .max(64, { message: 'Password must be less than 64 characters' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
})
