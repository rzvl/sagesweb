'use client'

import { useTransition } from 'react'
import { LogOut, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/server/actions/auth'
import { FullPageLoader, UserAvatar } from '@/components/elements'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { FullUser } from '@/server/actions/auth/get-current-user'

type AccountSidebarFooterProps = {
  user: FullUser | null
}

export function AccountSidebarFooter({ user }: AccountSidebarFooterProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = async () => {
    startTransition(async () => {
      const res = await logout()

      if (!res?.success) {
        toast.error(res.message)
      }
    })
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-12">
                <div className="flex w-full items-center gap-4">
                  <UserAvatar
                    src={user?.image || undefined}
                    className="h-9 w-9"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold">
                      {user?.name || user?.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.username ? `@${user?.username}` : user?.email}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isPending}
                className="group cursor-pointer transition-all duration-300 ease-in-out focus:bg-destructive/30"
              >
                <LogOut className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
            {isPending && <FullPageLoader text="Logging out..." />}
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
