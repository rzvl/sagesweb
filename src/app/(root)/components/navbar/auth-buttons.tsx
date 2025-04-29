import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/server/data/dal'
import { AvatarDropdown } from './avatar-dropdown'

export async function AuthButtons() {
  const user = await getCurrentUser()

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
