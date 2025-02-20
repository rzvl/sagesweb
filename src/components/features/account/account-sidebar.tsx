import Link from 'next/link'
import type { Session } from 'next-auth'
import { Bookmark, MoreHorizontal, Settings, UserRound } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo, UserAvatar } from '@/components/elements'
import AccountSidebarButton from './account-sidebar-button'
import SidebarBottomMenu from './sidebar-bottom-menu'

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

type AccountSidebarProps = {
  session: Session | null
}

export default function AccountSidebar({ session }: AccountSidebarProps) {
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AccountSidebarFooter session={session} />
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

function AccountSidebarFooter({ session }: AccountSidebarProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarBottomMenu>
            <SidebarMenuButton className="h-12">
              <div className="flex w-full items-center gap-4">
                <UserAvatar
                  src={session?.user.image || undefined}
                  className="h-9 w-9"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold">
                    {session?.user.name || session?.user.role}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {`@${session?.user.username}` || session?.user.email}
                  </span>
                </div>
                <MoreHorizontal className="ml-auto" />
              </div>
            </SidebarMenuButton>
          </SidebarBottomMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
