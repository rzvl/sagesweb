import { AuthCard, AuthPageContainer } from '@/components/features/auth'

export default function LoginPage() {
  return (
    <AuthPageContainer showHeader showFooter>
      <AuthCard type="login" />
    </AuthPageContainer>
  )
}
