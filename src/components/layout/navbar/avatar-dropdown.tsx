'use client'

import { useTransition } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import type { Session } from 'next-auth'
import { Bookmark, LogOut, Settings, User as UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FullPageLoader, UserAvatar } from '@/components/elements'
import { logout } from '@/server/actions/auth'
import { cn } from '@/lib/utils'

type AvatarDropdownProps = {
  user?: Session['user']
}

export default function AvatarDropdown({ user }: AvatarDropdownProps = {}) {
  const [isPending, startTransition] = useTransition()

  const menuItemStyles =
    'group cursor-pointer transition-all duration-300 ease-in-out'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar src={user?.image || undefined} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="m-1 flex flex-col items-center gap-2 rounded-sm bg-purple-700/30 p-3">
          <UserAvatar src={user?.image || undefined} />
          {user?.name && (
            <span className="text-sm font-medium">{user.name}</span>
          )}
          {(user?.username || user?.email) && (
            <span className="text-xs text-muted-foreground">
              {user.username ? `@${user.username}` : user.email}
            </span>
          )}
        </div>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemStyles} asChild>
          <Link href="/account/profile" className="flex items-center gap-2">
            <UserIcon className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemStyles}>
          <Bookmark className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemStyles}>
          <Settings className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:rotate-180" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            startTransition(async () => await logout())
          }}
          disabled={isPending}
          className={cn('focus:bg-destructive/30', menuItemStyles)}
        >
          <LogOut className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isPending &&
        createPortal(<FullPageLoader text="Logging out..." />, document.body)}
    </DropdownMenu>
  )
}
