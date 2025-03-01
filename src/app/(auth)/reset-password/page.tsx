'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  AuthPageContainer,
  ResetPasswordForm,
} from '@/components/features/auth'
import { AlertBox } from '@/components/elements'

export default function ResetPasswordPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <LockKeyhole className="mx-auto h-20 w-20" />
          <h1 className="text-center text-2xl font-bold">
            Reset Your Password
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <AlertBox variant="destructive" message={error} />}
          {success && <AlertBox variant="success" message={success} />}
          {!error && !success && (
            <>
              <p className="text-center text-sm leading-5 text-muted-foreground">
                Enter your new password below to regain access to your account.
              </p>
              <ResetPasswordForm setError={setError} setSuccess={setSuccess} />
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-4">
          {success && <SuccessButtons />}
          {error && <ErrorButtons />}
          {!error && !success && (
            <p className="leading-2 text-center text-xs text-muted-foreground">
              Make sure your new password is strong and easy to remember!
            </p>
          )}
        </CardFooter>
      </Card>
    </AuthPageContainer>
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
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/forgot-password">Resend Reset Link</Link>
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
