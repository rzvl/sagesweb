import { LockKeyhole } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { AuthPageContainer } from '../components/auth-page-container'
import { ResetPasswordForm } from './reset-password-form'

export default function ResetPasswordPage() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <LockKeyhole className="mx-auto h-20 w-20" />
          <h1 className="text-center text-2xl font-bold">
            Reset Your Password
          </h1>
        </CardHeader>
        <ResetPasswordForm />
      </Card>
    </AuthPageContainer>
  )
}
