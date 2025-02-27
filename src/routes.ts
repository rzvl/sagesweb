/**
 * Routes used for authentication
 * redirects to '/account/profile' if logged in
 * @type {string[]}
 */
const authRoutes = [
  '/login',
  '/signup',
  '/signup/success',
  '/verify-email',
  '/reset-password',
  '/login/forgot-password',
  '/login/resend-verification-email',
]

/**
 * The prefix for authentication API routes
 * @type {string}
 */
const apiAuthPrefix = '/api/auth'

/**
 * The prefix for routes that are related to the account settings.
 * Users should not be able to access these routes if they are not logged in!
 * @type {string}
 */
const accountRoutesPrefix = '/account/'

/**
 * The default redirect path for login
 * @type {string}
 */
const DEFAULT_LOGIN_REDIRECT = '/api/login'

export {
  accountRoutesPrefix,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
}
