import {} from 'next-auth/jwt'
import type { DefaultSession } from 'next-auth'
import type { UserRole } from '@/server/db/schema/users'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username?: string | null
      role?: UserRole
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string | null
    role?: UserRole
  }
}
