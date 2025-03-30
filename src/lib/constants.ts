export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sagesweb.com'
    : 'http://localhost:3000'

// Authentication
export const EAMIL_IS_VERIFIED_MESSAGE =
  'Your email is already verified! Please log in to continue.'

export const EMAIL_NOT_VERIFIED_MESSAGE = 'Email not verified!'

export const TWO_FACTOR_EMAIL_SENT_MESSAGE = '2FA email sent!'

export const COOKIE_SESSION_KEY = 'session-id'

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 14
