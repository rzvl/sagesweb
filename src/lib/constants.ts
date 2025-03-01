const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sagesweb.com'
    : 'http://localhost:3000'

const EAMIL_IS_VERIFIED_MESSAGE =
  'Your email is already verified! Please log in to continue.'

const EMAIL_NOT_VERIFIED_MESSAGE = 'Email not verified!'

const TWO_FACTOR_EMAIL_SENT_MESSAGE = '2FA email sent!'

export {
  BASE_URL,
  EAMIL_IS_VERIFIED_MESSAGE,
  EMAIL_NOT_VERIFIED_MESSAGE,
  TWO_FACTOR_EMAIL_SENT_MESSAGE,
}
