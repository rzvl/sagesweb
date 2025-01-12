import { Alert, AlertDescription } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'

type AuthMessageProps = {
  variant: 'success' | 'destructive'
  message: string
}

export default function AuthMessage({ variant, message }: AuthMessageProps) {
  return (
    <Alert variant={variant}>
      <AlertDescription className="flex items-center gap-x-2">
        <TriangleAlert className="h-4 w-4" /> <span>{message}</span>
      </AlertDescription>
    </Alert>
  )
}
