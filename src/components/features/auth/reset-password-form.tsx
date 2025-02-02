'use client'

import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { resetPasswordSchema } from '@/lib/validations'
import type { ResetPasswordSchema } from '@/lib/validations'
import { resetPassword } from '@/server/actions/auth'
import type { TResponse } from '@/lib/types'
import { Loader } from '@/components/elements'
import PasswordInput from './password-input'

type ResetPasswordFormProps = {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function ResetPasswordForm({
  setError,
  setSuccess,
}: ResetPasswordFormProps) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      token,
    },
  })

  console.log(token)

  const onSubmit = async (values: ResetPasswordSchema) => {
    setError('')
    setSuccess('')
    const response: TResponse = await resetPassword(values)
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={form.formState.isSubmitting}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Reset Password'}
        </Button>
      </form>
    </Form>
  )
}
