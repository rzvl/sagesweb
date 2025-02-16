'use client'

import { usePathname } from 'next/navigation'
import { SidebarMenuButton } from '@/components/ui/sidebar'

type AccountSidebarButtonProps = {
  url: string
  children: React.ReactNode
}

export default function AccountSidebarButton({
  url,
  children,
}: AccountSidebarButtonProps) {
  const pathname = usePathname()

  return (
    <SidebarMenuButton asChild isActive={url === pathname}>
      {children}
    </SidebarMenuButton>
  )
}
