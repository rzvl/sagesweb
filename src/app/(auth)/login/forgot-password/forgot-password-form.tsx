'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTimer } from 'react-timer-hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { addMinutes } from '@/lib/utils'
import type { TResponse } from '@/lib/types'
import { AlertBox } from '@/components/common/alert-box'
import { Loader } from '@/components/common/loader'
import { sendPasswordResetEmail } from './send-password-reset-email'
import { forgotPasswordSchema } from './schema'

export function ForgotPasswordForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: addMinutes(new Date(), 5),
    autoStart: false,
  })

  const buttonText = isRunning
    ? `Resend in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : 'Send Reset Link'

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setError('')
    setSuccess('')
    const response: TResponse = await sendPasswordResetEmail(values)
    form.reset()
    restart(addMinutes(new Date(), 5))

    if (response.success) {
      setSuccess(response.message)
    } else {
      setError(response.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting || isRunning}
                  placeholder="name@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <AlertBox variant="destructive" message={error} />}
        {success && <AlertBox variant="success" message={success} />}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isRunning}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : buttonText}
        </Button>
      </form>
    </Form>
  )
}
