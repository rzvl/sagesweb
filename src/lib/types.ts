import { z } from 'zod'
import { authFormSchema } from './validations'

type TAuthForm = z.infer<typeof authFormSchema>

export type { TAuthForm }
