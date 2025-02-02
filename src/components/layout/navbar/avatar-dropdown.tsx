import type { User } from 'next-auth'
import { User as UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/elements'
import LogoutMenuItem from './logout-menu-item'

type AvatarDropdownProps = {
  user: User | undefined
}

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
  return (
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
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
