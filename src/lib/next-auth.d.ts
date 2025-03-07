import {} from 'next-auth/jwt'
import type { DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  id: string
  username?: string | null
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    username?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}
