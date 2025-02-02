'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { useToast } from '@/hooks/use-toast'
import { loginSchema } from '@/lib/validations'
import type { LoginSchema } from '@/lib/validations'
import { login } from '@/server/actions/auth'
import type { TResponse } from '@/lib/types'
import { AlertBox, Loader } from '@/components/elements'
import PasswordInput from '@/components/features/auth/password-input'
import { emailNotVerifiedMessage } from '@/lib/constants'

export default function LogInForm() {
  const [error, setError] = useState('')

  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { toast } = useToast()

  const onSubmit = async (values: LoginSchema) => {
    setError('')
    const response: TResponse = await login(values)
    form.reset()

    if (response.success) {
      router.push('/')
      toast({
        description: "You're logged in!",
      })
    } else {
      if (response.message === emailNotVerifiedMessage) {
        router.push(`/login/resend-verification-email?email=${values.email}`)
      }
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/login/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
        {error && <AlertBox variant="destructive" message={error} />}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Log In'}
        </Button>
      </form>
    </Form>
  )
}
