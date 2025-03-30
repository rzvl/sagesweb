import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  AccountPageContainer,
  AccountSidebar,
} from '@/components/features/account'
import { verifySession } from '@/server/data/dal'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSession = await verifySession()

  if (!userSession) {
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
