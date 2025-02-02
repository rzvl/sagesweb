'use client'

import { useState } from 'react'
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
import { signupSchema } from '@/lib/validations'
import type { SignupSchema } from '@/lib/validations'
import { signup } from '@/server/actions/auth'
import { AlertBox, Loader } from '@/components/elements'
import PasswordInput from './password-input'

export default function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignupSchema) => {
    setError('')
    setSuccess('')
    const response = await signup(values)
    form.reset()

    if (response.success) {
      setSuccess(response.message)
      router.push(`/signup/success?email=${values.email}`)
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        {success && <AlertBox variant="success" message={success} />}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Create Account'}
        </Button>
      </form>
    </Form>
  )
}
