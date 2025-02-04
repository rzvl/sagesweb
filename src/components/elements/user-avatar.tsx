import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

type UserAvatarProps = {
  className?: string
  src?: string
}

export default function UserAvatar({ className, src }: UserAvatarProps) {
  return (
    <Avatar className={cn('h-6 w-6 rounded-full', className)}>
      <AvatarImage src={src} alt="avatar" />
      <AvatarFallback className="bg-primary text-primary-foreground">
        <User className="h-3/4 w-3/4" />
      </AvatarFallback>
    </Avatar>
  )
}
