import { cookies } from 'next/headers'
import { AlertBox } from '@/components/elements'
import { verifySession } from '@/server/data/session'
import { UserRole } from '@/server/db/schema/users'

type RoleGateProps = {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export async function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const userSession = await verifySession(await cookies())
  const role = userSession?.role as UserRole

  if (role && allowedRoles.includes(role)) {
    return <>{children}</>
  }

  return (
    <AlertBox
      variant="destructive"
      message="You do not have permission to access this content!"
    />
  )
}
