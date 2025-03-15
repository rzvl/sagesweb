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
        sub: z.string(),
        name: z.string(),
        picture: z.string().nullable(),
        email: z.string().email(),
      }),
      parser: (user) => ({
        id: user?.sub,
        name: user?.name,
        email: user.email,
        image: user?.picture,
      }),
    },
  })
}

/*
user_raw_data {
  sub: '103416362631947470323',
  name: 'reza vali',
  given_name: 'reza',
  family_name: 'vali',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocKNOffnsEPjIGTfjpaYisNYRBLOOnCne0ze8RwuG3BM-ZY53Q=s96-c',
  email: 'rezavalley@gmail.com',
  email_verified: true
}
  */
