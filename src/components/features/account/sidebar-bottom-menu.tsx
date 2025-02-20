'use client'

import { useTransition } from 'react'
import { LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/server/actions/auth'
import { FullPageLoader } from '@/components/elements'

export default function SidebarBottomMenu({
  children,
}: {
  children: React.ReactNode
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem
          onClick={() => startTransition(async () => await logout())}
          disabled={isPending}
          className="group cursor-pointer transition-all duration-300 ease-in-out focus:bg-destructive/30"
        >
          <LogOut className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isPending && <FullPageLoader text="Logging out..." />}
    </DropdownMenu>
  )
}
