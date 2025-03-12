import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/server/actions/auth'

export async function GET() {
  const user = await getCurrentUser({ withFullUser: true })

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
