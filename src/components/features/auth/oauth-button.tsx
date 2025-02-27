'use client'

import { useState } from 'react'
import { AppleIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { loginWithOAuth } from '@/server/actions/auth'
import { AlertBox, Loader } from '@/components/elements'

type OAuthButtonProps = {
  type: 'apple' | 'google'
}

export default function OAuthButton({ type }: OAuthButtonProps) {
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

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    setIsPending(true)

    const response = await loginWithOAuth(type)

    if (response?.error) {
      setError(response.error)
    }

    setIsPending(false)
  }

  return (
    <>
      {error && <AlertBox variant="destructive" message={error} />}
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
