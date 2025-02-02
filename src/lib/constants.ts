const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sagesweb.com'
    : 'http://localhost:3000'

const emailIsVerifiedMessage =
  'Your email is already verified! Please log in to continue.'

const emailNotVerifiedMessage = 'Email not verified!'

export { BASE_URL, emailIsVerifiedMessage, emailNotVerifiedMessage }
