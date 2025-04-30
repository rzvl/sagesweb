import { RoleGate } from '@/components/common/role-gate'

export default function AdminPage({ children }: { children: React.ReactNode }) {
  return <RoleGate allowedRoles={['admin']}>{children}</RoleGate>
}
