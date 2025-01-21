'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function PasswordInput(props: React.ComponentProps<'input'>) {
  const [type, setType] = useState<'password' | 'text'>('password')
  return (
    <div className="relative">
      <Input type={type} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute bottom-1 right-1 h-7 w-7 hover:bg-background"
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
      >
        {type === 'password' ? (
          <Eye className="h-4 w-4 text-gray-700" />
        ) : (
          <EyeOff className="h-4 w-4 text-gray-700" />
        )}
        <span className="sr-only">Toggle password visibility</span>
      </Button>
    </div>
  )
}
