import { RoleGate } from '@/components/common/role-gate'

export default function AdminPage() {
  return <RoleGate allowedRoles={['admin']}>Admin Page</RoleGate>
}
