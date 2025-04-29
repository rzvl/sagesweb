import { Alert, AlertDescription } from '@/components/ui/alert'
import { CircleAlert, CircleCheck } from 'lucide-react'

type AlertBoxProps = {
  variant: 'success' | 'destructive'
  message: string
}

export function AlertBox({ variant, message }: AlertBoxProps) {
  return (
    <Alert variant={variant}>
      <AlertDescription className="flex items-center gap-x-2">
        {variant === 'destructive' && message.length < 40 && (
          <CircleAlert className="h-4 w-4" />
        )}{' '}
        {variant === 'success' && message.length < 40 && (
          <CircleCheck className="h-4 w-4" />
        )}{' '}
        <span>{message}</span>
      </AlertDescription>
    </Alert>
  )
}
