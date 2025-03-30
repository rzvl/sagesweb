import { ProfileForm } from '@/components/features/account'
import { getUser } from '@/server/data/dal'

export default async function ProfilePage() {
  const user = await getUser()

  return (
    <section className="flex w-full justify-center py-10">
      <ProfileForm user={user} />
    </section>
  )
}
