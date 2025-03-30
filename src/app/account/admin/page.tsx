import { RoleGate } from '@/components/features/auth/role-gate'

export default function AdminPage() {
  return <RoleGate allowedRoles={['admin']}>Admin Page</RoleGate>
}
