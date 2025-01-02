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

function SignupPage() {
  return (
    <AuthPageContainer>
      <AuthCard>
        <AuthCardHeader
          title="Join Today"
          description="Sign up with your Apple or Google account"
        />
        <AuthCardContent>
          <OAuthButtonGroup>
            <OAuthButton>
              <AppleIcon />
              Sign Up with Apple
            </OAuthButton>
            <OAuthButton>
              <GoogleIcon />
              Sign Up with Google
            </OAuthButton>
          </OAuthButtonGroup>
          <SeparatorWithText text="Or continue with" />
          <AuthForm btnText="Sign Up" />
        </AuthCardContent>
        <AuthCardFooter
          text="Already have an account?"
          href="/login"
          linkText="Login"
        />
      </AuthCard>
    </AuthPageContainer>
  )
}

export default SignupPage
