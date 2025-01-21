import { Alert, AlertDescription } from '@/components/ui/alert'
import { CircleAlert, CircleCheck } from 'lucide-react'

type AlertBoxProps = {
  variant: 'success' | 'destructive'
  message: string
}

export default function AlertBox({ variant, message }: AlertBoxProps) {
  return (
    <Alert variant={variant}>
      <AlertDescription className="flex items-center gap-x-2">
        {variant === 'destructive' && <CircleAlert className="h-4 w-4" />}{' '}
        {variant === 'success' && <CircleCheck className="h-4 w-4" />}{' '}
        <span>{message}</span>
      </AlertDescription>
    </Alert>
  )
}
