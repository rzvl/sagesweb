import { redirect } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  AccountPageContainer,
  AccountSidebar,
} from '@/components/features/account'
import { getCurrentUser } from '@/server/data/user'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <header className="h-16">
        <AccountSidebar />
      </header>
      <main className="w-full p-4">
        <SidebarTrigger />
        <AccountPageContainer>{children}</AccountPageContainer>
      </main>
    </SidebarProvider>
  )
}
