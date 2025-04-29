import Link from 'next/link'
import { ActionSwitch } from '@/components/common/action-switch'
import { getCurrentUser } from '@/server/data/dal'
import { Toggle2FA } from './toggle-2fa'
import { ChangePasswordForm } from './change-password-form'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  const handleToggle = async () => {
    'use server'
    if (!user?.id || user?.isTwoFactorEnabled === null) {
      return {
        success: false,
        message: 'User not found!',
      }
    }
    return await Toggle2FA(user.id, !user.isTwoFactorEnabled)
  }

  return (
    <section className="flex w-full justify-center py-10">
      <ul className="w-full max-w-lg space-y-6">
        <li className="flex gap-4 rounded-lg border p-3 text-sm text-muted-foreground shadow-sm">
          <h3 className="font-semibold text-foreground">User Name:</h3>
          {user?.username ? (
            `@${user?.username}`
          ) : (
            <Link
              href="/username-setup"
              className="text-cyan-800 underline underline-offset-4"
            >
              Setup Now
            </Link>
          )}
        </li>
        <li>
          <ActionSwitch
            label="Two-Factor Authentication (2FA)"
            description="Enable for added account security"
            checked={user?.isTwoFactorEnabled || false}
            onToggleAction={handleToggle}
          />
        </li>
        <li className="space-y-6 rounded-lg border p-3 text-sm shadow-sm">
          <h3 className="font-semibold">Change Password:</h3>
          <ChangePasswordForm userId={user?.id || ''} />
        </li>
      </ul>
    </section>
  )
}
