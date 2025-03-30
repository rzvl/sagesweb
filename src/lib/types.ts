import { UserRole } from '@/server/db/schema/users'

export type TResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}

export type SessionCookie = {
  sessionId: string | null
  sessionExpiry: number | null
}

export type UserSession = {
  id: string
  role: UserRole
}

export type User = {
  name: string | null
  id: string
  email: string
  username: string | null
  image: string | null
  role: UserRole
}
