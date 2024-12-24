'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { AvatarComponent, FullPageLoader } from '@/components'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { useToast } from '@/components/ui/use-toast'
import { LogOut, User as UserIcon } from 'lucide-react'
import UserAvatar from '@/components/common/user-avatar'
// import { useToast } from '@/hooks/use-toast'

type AvatarDropdownProps = {
  user: User | undefined
}

export function AvatarDropdown({ user }: AvatarDropdownProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // const router = useRouter()
  // const { toast } = useToast()

  function handleSignOut() {
    setIsLoggingOut(true)
    signOut()
    setIsLoggingOut(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar src={user?.image || undefined} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleSignOut} disabled={isLoggingOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {isLoggingOut && <FullPageLoader text="Logging out..." />} */}
    </>
  )
}

export default AvatarDropdown
