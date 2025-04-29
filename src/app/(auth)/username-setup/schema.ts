import { z } from 'zod'
import { checkUsernameAvailability } from './setup-username'

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
