'use client'

import { useTransition } from 'react'
import { AppleIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { loginWithApple, loginWithGoogle } from '@/server/actions/auth'
import { Loader } from '@/components/elements'

type OAuthButtonProps = {
  type: 'apple' | 'google'
}

export default function OAuthButton({ type }: OAuthButtonProps) {
  const data = {
    apple: {
      icon: <AppleIcon />,
      text: 'Continue with Apple',
      action: loginWithApple,
    },
    google: {
      icon: <GoogleIcon />,
      text: 'Continue with Google',
      action: loginWithGoogle,
    },
  }[type]

  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      onClick={() => startTransition(async () => await data.action())}
      disabled={isPending}
    >
      {isPending ? (
        <Loader />
      ) : (
        <span className="flex items-center gap-2">
          {data.icon} {data.text}
        </span>
      )}
    </Button>
  )
}
