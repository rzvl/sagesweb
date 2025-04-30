'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bookmark,
  ChartNoAxesCombined,
  ChevronRight,
  CirclePlus,
  List,
  Settings,
  UserRound,
} from 'lucide-react'
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Logo } from '@/components/common/logo'
import { User } from '@/lib/types'
import { AccountSidebarFooter } from './account-sidebar-footer'

export function AccountSidebar({ user }: { user: User }) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <AccountSidebarHeader />
      <SidebarContent>
        <AccountSidebarGroup pathname={pathname} />
        {user?.role === 'admin' && <AdminSidebarGroup pathname={pathname} />}
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

function AccountSidebarGroup({ pathname }: { pathname: string }) {
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.url === pathname}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function AdminSidebarGroup({ pathname }: { pathname: string }) {
  const items = [
    {
      title: 'Analytics',
      url: '/account/admin/analytics',
      icon: ChartNoAxesCombined,
    },
    {
      title: 'Add',
      icon: CirclePlus,
      subItems: [
        {
          title: 'Teacher',
          url: '/account/admin/add-teacher',
        },
        {
          title: 'Book',
          url: '/account/admin/add-book',
        },
        {
          title: 'Course',
          url: '/account/admin/add-course',
        },
      ],
    },
    {
      title: 'Lists',
      icon: List,
      subItems: [
        {
          title: 'Teachers',
          url: '/account/admin/teachers-list',
        },
        {
          title: 'Books',
          url: '/account/admin/books-list',
        },
        {
          title: 'Courses',
          url: '/account/admin/courses-list',
        },
      ],
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) =>
            item.subItems ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.subItems
                  .map((subItem) => subItem.url)
                  .includes(pathname)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={subItem.url === pathname}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathname}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
