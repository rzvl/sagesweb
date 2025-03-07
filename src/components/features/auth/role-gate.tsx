'use client'

import { AlertBox } from '@/components/elements'
import { getCurrentUser } from '@/server/data/user'
import { UserRole } from '@/server/db/schema/users'

type RoleGateProps = {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export default function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const user = getCurrentUser()
  const role = user.role as UserRole

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
