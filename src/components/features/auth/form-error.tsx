import { TriangleAlert } from 'lucide-react'

type FormErrorProps = {
  message: string
}

export default function FromError({ message }: FormErrorProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <TriangleAlert className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}
