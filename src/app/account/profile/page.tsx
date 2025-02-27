import { ProfileForm } from '@/components/features/account'
import { auth } from '@/server/auth'

export default async function Page() {
  const session = await auth()
  return (
    <section className="flex w-full justify-center py-10">
      <ProfileForm session={session} />
    </section>
  )
}
