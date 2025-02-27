'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import {
  type ForgotPassword,
  forgotPasswordSchema,
} from '@/lib/validations/auth'
import { sendPasswordResetEmail } from '@/server/actions/auth'
import type { TResponse } from '@/lib/types'
import { AlertBox, Loader } from '@/components/elements'

export default function ForgotPasswordForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPassword) => {
    setError('')
    setSuccess('')
    const response: TResponse = await sendPasswordResetEmail(values)
    form.reset()

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
                  disabled={form.formState.isSubmitting}
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
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  )
}
