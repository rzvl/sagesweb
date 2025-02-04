import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
  password: z.string().trim().min(1, { message: 'Password is required' }),
})

const signupSchema = z.object({
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

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(320, { message: 'Email must be less than 320 characters' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
})

const resetPasswordSchema = z.object({
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

type LoginSchema = z.infer<typeof loginSchema>
type SignupSchema = z.infer<typeof signupSchema>
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export { loginSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema }
export type {
  LoginSchema,
  SignupSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
}
