'use client'

import { useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { AppleIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { oAuthLogin } from '@/server/actions/auth'
import { AlertBox, Loader } from '@/components/elements'

type OAuthButtonProps = {
  type: 'google'
}

export function OAuthButton({ type }: OAuthButtonProps) {
  const data = {
    apple: {
      icon: AppleIcon,
      text: 'Continue with Apple',
    },
    google: {
      icon: GoogleIcon,
      text: 'Continue with Google',
    },
  }[type]

  const searchParams = useSearchParams()
  const oauthError = searchParams.get('oauthError')

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    setIsPending(true)

    const res = await oAuthLogin(type)

    if (res.success && res.data) {
      redirect(res.data)
    } else {
      setError(res.message)
    }

    setIsPending(false)
  }

  return (
    <>
      {error && <AlertBox variant="destructive" message={error} />}
      {oauthError && <AlertBox variant="destructive" message={oauthError} />}
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          <Loader />
        ) : (
          <span className="flex items-center gap-2">
            <data.icon /> {data.text}
          </span>
        )}
      </Button>
    </>
  )
}
