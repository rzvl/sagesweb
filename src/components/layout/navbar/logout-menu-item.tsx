'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FullPageLoader } from '@/components/elements'
import { useToast } from '@/hooks/use-toast'
import { logout } from '@/server/actions/auth'

export default function LogoutMenuItem() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const { toast } = useToast()

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    const response = await logout()
    setIsLoggingOut(false)

    if (response.success) {
      toast({
        description: response.message,
      })
      router.push('/login')
    } else {
      toast({
        description: response.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <DropdownMenuItem onSelect={handleSignOut} disabled={isLoggingOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
      {isLoggingOut && <FullPageLoader text="Logging out..." />}
    </>
  )
}
