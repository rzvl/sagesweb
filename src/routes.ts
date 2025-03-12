/**
 * Routes used for authentication
 * redirects to '/account/profile' if logged in
 * @type {string[]}
 */
export const authRoutes = [
  '/login',
  '/signup',
  '/signup/success',
  '/verify-email',
  '/reset-password',
  '/login/forgot-password',
  '/login/resend-verification-email',
]

/**
 * The default redirect path for login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/api/auth/login'
