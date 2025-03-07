import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/server/data/user'

export async function GET() {
  const user = getCurrentUser()

  console.log('current user', user)

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!user.username) {
    redirect('/username-setup')
  } else if (!user.name) {
    redirect('/account/profile')
  } else {
    redirect('/')
  }
}
