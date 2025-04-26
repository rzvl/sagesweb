import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(150, { message: 'Name must be at most 150 characters' })
    .optional(),
  image: z.string().trim().optional(),
})
