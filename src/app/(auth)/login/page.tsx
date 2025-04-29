import { AuthCard } from '../components/auth-card'
import { AuthPageContainer } from '../components/auth-page-container'

export default function LoginPage() {
  return (
    <AuthPageContainer showHeader showFooter>
      <AuthCard type="login" />
    </AuthPageContainer>
  )
}
