import { CircleCheck } from 'lucide-react'

type FormErrorProps = {
  message: string
}

export default function FromSuccess({ message }: FormErrorProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-success/15 p-3 text-sm text-success">
      <CircleCheck className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}
