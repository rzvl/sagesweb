import { AuthCard, AuthPageContainer } from '@/components/features/auth'

export default function SignupPage() {
  return (
    <AuthPageContainer showHeader showFooter>
      <AuthCard type="signup" />
    </AuthPageContainer>
  )
}
