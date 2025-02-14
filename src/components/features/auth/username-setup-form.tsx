'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertBox, Loader } from '@/components/elements'
import {
  usernameSetupSchema,
  type UsernameSetupSchema,
} from '@/lib/validations'
import { setupUsername } from '@/server/actions/auth'

export default function UsernameSetupForm() {
  const [error, setError] = useState('')
  const [succes, setSuccess] = useState('')

  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const router = useRouter()

  const form = useForm<UsernameSetupSchema>({
    resolver: zodResolver(usernameSetupSchema),
    mode: 'onBlur',
    defaultValues: {
      email,
      username: '',
    },
  })

  const onSubmit = async (values: UsernameSetupSchema) => {
    setError('')
    setSuccess('')

    const response = await setupUsername(values)

    if (response.success) {
      setSuccess(response.message)
      router.push('/account/profile')
    } else {
      setError(response.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <AlertBox variant="destructive" message={error} />}
        {succes && <AlertBox variant="success" message={succes} />}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Set Username'}
        </Button>
      </form>
    </Form>
  )
}
