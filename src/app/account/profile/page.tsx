import { ProfileForm } from '@/components/features/account'
import { getCurrentUser } from '@/server/actions/auth'

export default async function ProfilePage() {
  const user = await getCurrentUser({ withFullUser: true })

  return (
    <section className="flex w-full justify-center py-10">
      <ProfileForm user={user} />
    </section>
  )
}
