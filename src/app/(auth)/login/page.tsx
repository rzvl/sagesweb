import { SeparatorWithText } from '@/components/elements'
import {
  AuthCard,
  AuthCardContent,
  AuthCardFooter,
  AuthCardHeader,
  AuthForm,
  AuthPageContainer,
  OAuthButton,
  OAuthButtonGroup,
} from '@/components/features/auth'
import { AppleIcon, GoogleIcon } from '@/components/icons'

export default function LoginPage() {
  return (
    <AuthPageContainer>
      <AuthCard>
        <AuthCardHeader
          title="Welcome back"
          description="Login with your Apple or Google account"
        />
        <AuthCardContent>
          <OAuthButtonGroup>
            <OAuthButton>
              <AppleIcon />
              Login with Apple
            </OAuthButton>
            <OAuthButton>
              <GoogleIcon />
              Login with Google
            </OAuthButton>
          </OAuthButtonGroup>
          <SeparatorWithText text="Or continue with" />
          <AuthForm showForgotPassword btnText="Login" />
        </AuthCardContent>
        <AuthCardFooter
          text="Don't have an account?"
          href="/signup"
          linkText="Sign up"
        />
      </AuthCard>
    </AuthPageContainer>
  )
}
