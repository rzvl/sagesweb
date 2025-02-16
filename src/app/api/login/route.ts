import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

export async function GET() {
  const session = await auth()

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!session.user.username) {
    redirect('/username-setup')
  } else if (!session.user.name) {
    redirect('/account/profile')
  } else {
    redirect('/')
  }
}
