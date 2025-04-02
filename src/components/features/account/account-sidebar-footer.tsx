'use client'

import { useTransition } from 'react'
import { LogOut, MoreHorizontal, SunMoon } from 'lucide-react'
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
import { User } from '@/lib/types'
import { useTheme } from 'next-themes'

type AccountSidebarFooterProps = {
  user: User | null
}

export function AccountSidebarFooter({ user }: AccountSidebarFooterProps) {
  const [isPending, startTransition] = useTransition()

  const { setTheme, theme } = useTheme()

  const handleChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

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
                    <span className="w-24 truncate text-xs font-semibold">
                      {user?.name || user?.role}
                    </span>
                    <span className="w-24 truncate text-xs text-muted-foreground">
                      {user?.username ? `@${user?.username}` : user?.email}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem
                onClick={handleChangeTheme}
                disabled={isPending}
                className="group cursor-pointer transition-all duration-300 ease-in-out focus:bg-destructive/30"
              >
                <SunMoon className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:scale-75" />
                Change Theme
              </DropdownMenuItem>
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
