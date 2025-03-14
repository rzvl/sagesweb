import { z } from 'zod'
import { env } from '@/env/server'
import { OAuthClient } from './base'

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: 'google',
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    scopes: ['email', 'openid', 'profile'],
    urls: {
      auth: 'https://accounts.google.com/o/oauth2/v2/auth',
      token: 'https://www.googleapis.com/oauth2/v4/token',
      user: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    userInfo: {
      schema: z.object({
        id: z.number(),
        name: z.string().nullable(),
        login: z.string(),
        email: z.string().email(),
      }),
      parser: (user) => ({
        id: user.id.toString(),
        name: user.name ?? user.login,
        email: user.email,
      }),
    },
  })
}
