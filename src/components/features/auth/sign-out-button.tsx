'use client'

import { useTransition } from 'react'
import { Loader } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { logout } from '@/server/actions/auth'

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const handleSignOut = () => {
    startTransition(async () => await logout())
  }
  return (
    <Button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? <Loader /> : 'Sign Out'}
    </Button>
  )
}
