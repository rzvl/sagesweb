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
import { useRouter } from 'next/navigation'

export default function Page() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const router = useRouter()

  useEffect(() => {
    async function verifyUserEamil(token: string | null) {
      const response = await verifyEmail(token)
      if (response.success) {
        setSuccess(response.message)
        router.push(`/username-setup?email=${email}`)
      } else {
        setError(response.message)
      }
      setIsLoading(false)
    }

    verifyUserEamil(token)
  }, [token, email, router])

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
