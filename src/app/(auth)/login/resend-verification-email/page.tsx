import {
  AuthPageContainer,
  VerifyEmailMessage,
} from '@/components/features/auth'

export default function ResendVerificationEmailPage() {
  return (
    <AuthPageContainer showHeader>
      <VerifyEmailMessage
        title="Verify Your Email to Access Your Account"
        description="It looks like you tried to log in to your account, but your email address hasn’t been verified yet. To complete your account setup and log in, please verify your email address by clicking the button below."
        autoStartTimer={false}
      />
    </AuthPageContainer>
  )
}
