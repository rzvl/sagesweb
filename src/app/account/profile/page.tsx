import { cookies } from 'next/headers'
import { ProfileForm } from '@/components/features/account'
import { getCurrentUser } from '@/server/data/session'

export default async function ProfilePage() {
  const user = await getCurrentUser(await cookies())

  return (
    <section className="flex w-full justify-center py-10">
      <ProfileForm user={user} />
    </section>
  )
}
