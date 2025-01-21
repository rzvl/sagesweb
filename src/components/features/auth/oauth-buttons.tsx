'use client'

import { AppleIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

function AppleOAuthButton() {
  return (
    <Button variant="outline" className="w-full" type="button">
      <AppleIcon /> Continue with Apple
    </Button>
  )
}

function GoogleOAuthButton() {
  return (
    <Button variant="outline" className="w-full" type="button">
      <GoogleIcon /> Continue with Google
    </Button>
  )
}

export { AppleOAuthButton, GoogleOAuthButton }
