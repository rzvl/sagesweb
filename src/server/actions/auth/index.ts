import { loginWithEmail, loginWithOAuth } from './login'
import logout from './logout'
import signup from './signup'
import verifyEmail from './verify-email'
import resendVerificationEmail from './resend-verification-email'
import sendPasswordResetEmail from './send-password-reset-email'
import resetPassword from './reset-password'
import { checkUsernameAvailability, setupUsername } from './setup-username'

export {
  loginWithEmail,
  loginWithOAuth,
  logout,
  signup,
  verifyEmail,
  resetPassword,
  resendVerificationEmail,
  sendPasswordResetEmail,
  setupUsername,
  checkUsernameAvailability,
}
