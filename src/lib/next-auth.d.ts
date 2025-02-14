import {} from 'next-auth'
import {} from 'next-auth/jwt'
import type { UserRole } from '@/server/db/schema'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      username?: string | null
      role?: UserRole
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string | null
  }
}
