'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTimer } from 'react-timer-hook'
import { Button } from '@/components/ui/button'
import { resendVerificationEmail } from '@/server/actions/auth.actions'
import { AlertBox, Loader } from '@/components/elements'
import { addMinutes } from '@/lib/utils'

export default function ResendEmailVerificationButton({
  autoStart = true,
}: {
  autoStart?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
      setSuccess(res.success)
      restart(addMinutes(new Date(), 5))
    }

    if (res.error) {
      setError(res.error)
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
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        disabled={isRunning}
        onClick={() => handleResendVerificationEmail()}
      >
        {isLoading ? <Loader /> : buttonText}
      </Button>
    </div>
  )
}
