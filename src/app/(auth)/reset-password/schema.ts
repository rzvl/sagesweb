import { z } from 'zod'

export const resetPasswordSchema = z.object({
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
  token: z
    .string()
    .min(1, { message: 'Token is required' })
    .nullable()
    .optional(),
})
