import { getCurrentUser } from '@/server/data/dal'
import { ProfileForm } from './components/profile-form'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  return (
    <section className="flex w-full justify-center py-10">
      <ProfileForm user={user} />
    </section>
  )
}
