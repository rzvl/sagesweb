import { AuthPageContainer } from '../../components/auth-page-container'
import { VerifyEmailMessage } from '../../components/verify-email-message'

export default function SuccessPage() {
  return (
    <AuthPageContainer showHeader>
      <VerifyEmailMessage
        title="Thanks for signing up!"
        description="We've sent a verification email to the address you provided. Please check your inbox and click the link to verify your email. If you don’t see it, click the Resend Verification Email button once the timer ends."
      />
    </AuthPageContainer>
  )
}
