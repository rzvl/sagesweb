import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(320, { message: 'Email must be less than 320 characters' })
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),
})
