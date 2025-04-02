'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { TResponse } from '@/lib/types'

interface ActionSwitchProps {
  label: string
  description?: string
  checked: boolean
  onToggleAction: () => Promise<TResponse>
}

export function ActionSwitch({
  label,
  description,
  checked,
  onToggleAction,
}: ActionSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = async () => {
    setIsChecked(!checked)
    const response = await onToggleAction()

    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <Label htmlFor="action-switch">{label}</Label>
        {description && (
          <div className="text-[0.8rem] text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      <Switch
        id="action-switch"
        checked={isChecked}
        onCheckedChange={handleToggle}
      />
    </div>
  )
}
