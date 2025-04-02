import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(150, { message: 'Name must be at most 150 characters' })
    .optional(),
  image: z.string().trim().optional(),
})

export const changePasswordSchema = z.object({
  userId: z.string().trim(),
  currentPassword: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' }),
  newPassword: z
    .string()
    .trim()
    .min(1, { message: 'Repeat Password is required' })
    .min(8, { message: 'Repeat Password must be at least 8 characters' })
    .max(64, { message: 'Repeat Password must be less than 64 characters' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
})
