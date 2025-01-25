'use client'

import { useTransition } from 'react'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { LogOut, User as UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FullPageLoader, UserAvatar } from '@/components/elements'

type AvatarDropdownProps = {
  user: User | undefined
}

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
  const [isLoggingOut, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut()
    })
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

      {isLoggingOut && <FullPageLoader text="Logging out..." />}
    </>
  )
}
