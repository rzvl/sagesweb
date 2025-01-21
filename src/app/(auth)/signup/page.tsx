import { AuthCard, AuthPageContainer } from '@/components/features/auth'

export default function Page() {
  return (
    <AuthPageContainer showHeader showFooter>
      <AuthCard type="signup" />
    </AuthPageContainer>
  )
}
