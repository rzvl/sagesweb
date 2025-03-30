import { redirect } from 'next/navigation'
import { getUser } from '@/server/data/dal'

export async function GET() {
  const user = await getUser()

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
