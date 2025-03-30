import { login, oAuthLogin } from './login'
import { logout } from './logout'
import { signup } from './signup'
import { verifyEmail } from './verify-email'
import { resendVerificationEmail } from './send-verification-email'
import { sendPasswordResetEmail } from './send-password-reset-email'
import { resetPassword } from './reset-password'
import { checkUsernameAvailability, setupUsername } from './setup-username'
import { updateProfileSettings } from './update-profile-settings'

export {
  login,
  oAuthLogin,
  logout,
  signup,
  verifyEmail,
  resetPassword,
  resendVerificationEmail,
  sendPasswordResetEmail,
  setupUsername,
  checkUsernameAvailability,
  updateProfileSettings,
}
