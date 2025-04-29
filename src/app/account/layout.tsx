import { redirect } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { verifySession } from '@/server/data/dal'
import { AccountPageContainer } from './components/account-page-container'
import { AccountSidebar } from './components/account-sidebar'

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
