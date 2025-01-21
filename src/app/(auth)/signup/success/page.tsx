import { MailSearch } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  AuthPageContainer,
  ResendEmailVerificationButton,
} from '@/components/features/auth'

export default function Page() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <MailSearch className="mx-auto h-20 w-20" />
          <h1 className="text-center text-2xl font-bold">
            Thanks for signing up!
          </h1>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            We&apos;ve sent a verification email to the address you provided.
            Please check your inbox (and spam folder) to verify your account.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            If you haven’t received the verification email, please click the
            &apos;Resend Verification Email&apos; button after the timer ends.
          </p>
        </CardContent>
        <CardFooter>
          <ResendEmailVerificationButton />
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}
