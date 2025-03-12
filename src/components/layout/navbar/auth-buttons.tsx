import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AvatarDropdown } from './avatar-dropdown'
import { getCurrentUser } from '@/server/actions/auth'

export async function AuthButtons() {
  const user = await getCurrentUser({ withFullUser: true })

  if (user) {
    return <AvatarDropdown user={user} />
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" className="h-10 w-fit" asChild>
        <Link href="/login">Log In</Link>
      </Button>
      <Button className="h-10 w-fit" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  )
}
