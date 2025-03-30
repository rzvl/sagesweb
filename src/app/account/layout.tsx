import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  AccountPageContainer,
  AccountSidebar,
} from '@/components/features/account'
import { verifySession } from '@/server/data/session'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSession = await verifySession(await cookies())

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
