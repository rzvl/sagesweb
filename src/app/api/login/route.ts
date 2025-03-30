import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/server/data/session'

export async function GET() {
  const user = await getCurrentUser(await cookies())

  if (!user) {
    redirect('/login')
  }

  if (!user.username) {
    redirect('/username-setup')
  } else if (!user.name) {
    redirect('/account/profile')
  } else {
    redirect('/')
  }
}
