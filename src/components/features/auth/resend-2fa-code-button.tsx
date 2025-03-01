'use client'

import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { Button } from '@/components/ui/button'
import { AlertBox, Loader } from '@/components/elements'
import { addMinutes } from '@/lib/utils'
import { resendTwoFactorEmail } from '@/server/actions/auth/send-two-factor-email'

export default function ResendTwoFactorCodeButton({
  email,
}: {
  email: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: addMinutes(new Date(), 1),
    autoStart: true,
  })

  async function handleResendTwoFactorCode() {
    setError('')
    setSuccess('')
    setIsLoading(true)

    if (!email) {
      setError('Email was not provided!')
      setIsLoading(false)
      return
    }

    const res = await resendTwoFactorEmail(email)
    if (res.success) {
      setSuccess(res.message)
      restart(addMinutes(new Date(), 5))
    } else {
      setError(res.message)
    }

    setIsLoading(false)
  }

  const buttonText = isRunning
    ? `Resend in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : 'Resend 2FA code'

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      {error && <AlertBox variant="destructive" message={error} />}
      {success && <AlertBox variant="success" message={success} />}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        size="lg"
        disabled={isRunning}
        onClick={() => handleResendTwoFactorCode()}
      >
        {isLoading ? <Loader /> : buttonText}
      </Button>
    </div>
  )
}
