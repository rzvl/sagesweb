import { RoleGate } from '@/components/features/auth'

export default function AdminPage() {
  return <RoleGate allowedRoles={['admin']}>Admin Page</RoleGate>
}
