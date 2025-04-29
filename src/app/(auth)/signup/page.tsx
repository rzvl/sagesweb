import { AuthPageContainer } from '../components/auth-page-container'
import { AuthCard } from '../components/auth-card'

export default function SignupPage() {
  return (
    <AuthPageContainer showHeader showFooter>
      <AuthCard type="signup" />
    </AuthPageContainer>
  )
}
