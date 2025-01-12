'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
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
import { loginSchema, signupSchema } from '@/lib/validations'
import { login, signup } from '@/server/actions/auth.actions'
import AuthMessage from './auth-message'
import { ActionResponse } from '@/lib/types'

type AuthFormProps = {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const schema = type === 'login' ? loginSchema : signupSchema
  const action = type === 'login' ? login : signup

  // const [isLoading, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    const response: ActionResponse = await action(values)
    setIsLoading(false)
    if (response.error) setError(response.error)
    if (response.success) setSuccess(response.success)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
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
                {type === 'login' && (
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <AuthMessage variant="destructive" message={error} />}
        {success && <AuthMessage variant="success" message={success} />}
        <Button type="submit" disabled={isLoading} className="w-full">
          {type === 'login' ? 'Login' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
