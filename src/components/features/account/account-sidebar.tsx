import Link from 'next/link'
import { Bookmark, Settings, UserRound, UserRoundCheck } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/elements'
import { AccountSidebarButton } from './account-sidebar-button'
import { AccountSidebarFooter } from './account-sidebar-footer'
import { getCurrentUser } from '@/server/actions/auth'

const items = [
  {
    title: 'Profile',
    url: '/account/profile',
    icon: UserRound,
  },
  {
    title: 'Bookmarks',
    url: '/account/bookmarks',
    icon: Bookmark,
  },
  {
    title: 'Settings',
    url: '/account/settings',
    icon: Settings,
  },
]

export async function AccountSidebar() {
  const user = await getCurrentUser({ withFullUser: true })

  return (
    <Sidebar>
      <AccountSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <AccountSidebarButton url={item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </AccountSidebarButton>
                </SidebarMenuItem>
              ))}
              {user?.role === 'admin' && (
                <SidebarMenuItem key="admin">
                  <AccountSidebarButton url="/account/admin">
                    <Link href="/account/admin">
                      <UserRoundCheck />
                      <span>Admin</span>
                    </Link>
                  </AccountSidebarButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AccountSidebarFooter user={user} />
    </Sidebar>
  )
}

function AccountSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="h-10" asChild>
            <Link href="/">
              <Logo text="Home" className="text-lg" size={22} />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
