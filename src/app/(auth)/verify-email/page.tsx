'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { verifyEmail } from '@/server/actions/auth'
import { AlertBox, Loader } from '@/components/elements'
import {
  AuthPageContainer,
  ResendEmailVerificationButton,
} from '@/components/features/auth'

export default function VerifyEmailPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    async function verifyUserEamil(token: string | null) {
      const res = await verifyEmail(token)
      if (res.success) {
        setSuccess(res.message)
      } else {
        setError(res.message)
      }
      setIsLoading(false)
    }

    verifyUserEamil(token)
  }, [token])

  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <MailCheck className="mx-auto h-20 w-20" />
          <h1 className="text-center text-2xl font-bold">Email Verification</h1>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingMessage />}
          {error && <AlertBox variant="destructive" message={error} />}
          {success && <AlertBox variant="success" message={success} />}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-4">
          {error && <ErrorButtons />}
          {success && <SuccessButtons />}
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}

function LoadingMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader />
      <p className="font-medium text-muted-foreground">
        Verifying your email...
      </p>
    </div>
  )
}

function SuccessButtons() {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href="/login">Log In</Link>
    </Button>
  )
}

function ErrorButtons() {
  return (
    <>
      <ResendEmailVerificationButton autoStart={false} />
      <Button variant="outline" className="w-full" asChild>
        <Link href="/signup">Create Account</Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/contact">Contact Support</Link>
      </Button>
    </>
  )
}
