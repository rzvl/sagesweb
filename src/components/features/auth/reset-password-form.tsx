'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { type ResetPassword, resetPasswordSchema } from '@/lib/validations/auth'
import { resetPassword } from '@/server/actions/auth'
import type { TResponse } from '@/lib/types'
import { AlertBox, Loader } from '@/components/elements'
import PasswordInput from './password-input'

export default function ResetPasswordForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      token,
    },
  })

  const onSubmit = async (values: ResetPassword) => {
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
    <>
      <CardContent className="space-y-4">
        {error && <AlertBox variant="destructive" message={error} />}
        {success && <AlertBox variant="success" message={success} />}
        {!error && !success && (
          <>
            <p className="text-center text-sm leading-5 text-muted-foreground">
              Enter your new password below to regain access to your account.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
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
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-4">
        {success && <SuccessButtons />}
        {error && <ErrorButtons />}
        {!error && !success && (
          <p className="leading-2 text-center text-xs text-muted-foreground">
            Make sure your new password is strong and easy to remember!
          </p>
        )}
      </CardFooter>
    </>
  )
}

function SuccessButtons() {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href="/login">Log In</Link>
    </Button>
  )
}

function ErrorButtons() {
  return (
    <>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/forgot-password">Resend Reset Link</Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/signup">Create Account</Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/contact">Contact Support</Link>
      </Button>
    </>
  )
}
