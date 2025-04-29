import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthPageContainer } from '../components/auth-page-container'

export default function AuthErrorPage() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <ShieldAlert className="mx-auto h-20 w-20 text-red-700" />
          <h1 className="text-center text-xl font-bold">
            Oops! Something went wrong!
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm leading-5 text-muted-foreground">
            We couldn’t process your request. Please check your details and try
            again. If the issue persists, contact support.
          </p>
          {/* <p className="text-center text-sm leading-5 text-muted-foreground">
            If the issue persists, contact support.
          </p> */}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-4">
          <AuthErrorButtons />
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}

function AuthErrorButtons() {
  return (
    <>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login">Log In</Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/signup">Create Account</Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/contact">Contact Support</Link>
      </Button>
    </>
  )
}
