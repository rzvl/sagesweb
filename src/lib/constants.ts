import { env } from '@/env/client'

export const BASE_URL =
  env.NEXT_PUBLIC_NODE_ENV === 'production'
    ? 'https://sagesweb.com'
    : 'http://localhost:3000'

export const EAMIL_IS_VERIFIED_MESSAGE =
  'Your email is already verified! Please log in to continue.'

export const EMAIL_NOT_VERIFIED_MESSAGE = 'Email not verified!'

export const TWO_FACTOR_EMAIL_SENT_MESSAGE = '2FA email sent!'
