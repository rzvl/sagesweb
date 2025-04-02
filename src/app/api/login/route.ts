import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/server/data/dal'

export async function GET() {
  const user = await getCurrentUser()

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
