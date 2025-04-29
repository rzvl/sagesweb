import { cn } from '@/lib/utils'
import Image from 'next/image'

type LogoProps = {
  text?: string
  size?: number
  className?: string
}

export function Logo({ text, size = 24, className }: LogoProps) {
  return (
    <div className="flex items-center justify-start">
      <Image src="/images/logo.svg" alt="Logo" width={size} height={size} />
      {text && (
        <span
          className={cn('ml-2 text-xl font-semibold text-gray-950', className)}
        >
          {text}
        </span>
      )}
    </div>
  )
}
