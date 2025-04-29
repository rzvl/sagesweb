'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTimer } from 'react-timer-hook'
import { Button } from '@/components/ui/button'
import { addMinutes } from '@/lib/utils'
import { EAMIL_IS_VERIFIED_MESSAGE } from '@/lib/constants'
import { useSearchParams } from 'next/navigation'
import { AlertBox } from '@/components/common/alert-box'
import { Loader } from '@/components/common/loader'
import { resendVerificationEmail } from '../actions/send-verification-email'

export function ResendEmailVerificationButton({
  autoStart = true,
}: {
  autoStart?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showLoginBtn, setShowLoginBtn] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: addMinutes(new Date(), 5),
    autoStart,
  })

  async function handleResendVerificationEmail() {
    setError('')
    setSuccess('')
    setIsLoading(true)

    if (!email) {
      setError('Email was not provided')
      setIsLoading(false)
      return
    }

    const res = await resendVerificationEmail(email)
    if (res.success) {
      setSuccess(res.message)
      if (res.message === EAMIL_IS_VERIFIED_MESSAGE) {
        setShowLoginBtn(true)
        return
      }
      restart(addMinutes(new Date(), 5))
    } else {
      setError(res.message)
    }

    setIsLoading(false)
  }

  const buttonText = isRunning
    ? `Resend in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : 'Resend verification email'

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      {error && <AlertBox variant="destructive" message={error} />}
      {success && <AlertBox variant="success" message={success} />}
      {showLoginBtn ? (
        <LoginBtn />
      ) : (
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          disabled={isRunning}
          onClick={() => handleResendVerificationEmail()}
        >
          {isLoading ? <Loader /> : buttonText}
        </Button>
      )}
    </div>
  )
}

function LoginBtn() {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href="/login">Log In</Link>
    </Button>
  )
}
