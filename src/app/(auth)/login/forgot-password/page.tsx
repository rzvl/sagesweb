import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  AuthPageContainer,
  ForgotPasswordForm,
} from '@/components/features/auth'
import Link from 'next/link'

export default function Page() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Forgot Your Password?
          </h1>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-sm leading-6 text-muted-foreground">
            Enter the email address associated with your account, and we’ll send
            you a link to reset your password.
          </p>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-xs leading-4 text-muted-foreground">
            If you don’t receive an email within a few minutes, please check
            your spam folder or try again.
          </p>
          <p className="text-center text-sm leading-6">
            Remember your password?{' '}
            <Link href="/login" className="underline underline-offset-4">
              Log in here
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}
