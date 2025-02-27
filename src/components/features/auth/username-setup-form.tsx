'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { type UsernameSetup, usernameSetupSchema } from '@/lib/validations/auth'
import { setupUsername } from '@/server/actions/auth'

type UsernameSetupFormProps = {
  email: string
}

export default function UsernameSetupForm({ email }: UsernameSetupFormProps) {
  const [error, setError] = useState('')
  const [succes, setSuccess] = useState('')

  const router = useRouter()

  const form = useForm<UsernameSetup>({
    resolver: zodResolver(usernameSetupSchema),
    mode: 'onBlur',
    defaultValues: {
      email,
      username: '',
    },
  })

  const onSubmit = async (values: UsernameSetup) => {
    setError('')
    setSuccess('')

    const response = await setupUsername(values)

    form.reset()

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
