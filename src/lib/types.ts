import { z } from 'zod'
import { loginSchema } from '@/lib/validations'

type ActionResponse = {
  success?: string
  error?: string
  data?: unknown
}

type AuthFormData = z.infer<typeof loginSchema>

export type { ActionResponse, AuthFormData }
