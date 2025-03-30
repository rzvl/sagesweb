import { cookies } from 'next/headers'
import Link from 'next/link'
import { ActionSwitch } from '@/components/elements'
import { ChangePasswordForm } from '@/components/features/account'
import { getCurrentUser } from '@/server/data/session'

export default async function SettingsPage() {
  const user = await getCurrentUser(await cookies())

  const handleToggle = async (isChecked: boolean) => {
    'use server'
    return {
      success: true,
      message: `Switch is now ${isChecked ? 'ON' : 'OFF'}`,
    }
  }

  return (
    <section className="flex w-full justify-center py-10">
      <ul className="w-full max-w-lg space-y-6">
        <li className="flex gap-4 rounded-lg border p-3 text-sm text-muted-foreground shadow-sm">
          <h3 className="font-semibold text-foreground">User Name:</h3>
          {user?.username ? (
            `@${user?.username}`
          ) : (
            <Link href="/username-setup">Setup Now</Link>
          )}
        </li>
        <li>
          <ActionSwitch
            label="Two-Factor Authentication (2FA)"
            description="Enable for added account security"
            onToggleAction={handleToggle}
          />
        </li>
        <li className="space-y-6 rounded-lg border p-3 text-sm font-semibold shadow-sm">
          <h3>Change Password:</h3>
          <ChangePasswordForm />
        </li>
      </ul>
    </section>
  )
}
