'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  EMAIL_NOT_VERIFIED_MESSAGE,
  TWO_FACTOR_EMAIL_SENT_MESSAGE,
} from '@/lib/constants'
import { AlertBox } from '@/components/common/alert-box'
import { Loader } from '@/components/common/loader'
import { PasswordInput } from '@/components/common/password-input'
import { login } from '../actions/login'
import { ResendTwoFactorCodeButton } from './resend-2fa-code-button'
import { logInSchema } from '../schema'

export function LogInForm() {
  const [error, setError] = useState('')
  const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof logInSchema>) => {
    setError('')

    const res = await login(values)

    if (!res.success) {
      if (res.message === EMAIL_NOT_VERIFIED_MESSAGE) {
        router.push(`/login/resend-verification-email?email=${values.email}`)
      } else if (res.message === TWO_FACTOR_EMAIL_SENT_MESSAGE) {
        setShowTwoFactorAuth(true)
        return
      } else {
        setShowTwoFactorAuth(false)
        setError(res.message)
        form.reset()
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {showTwoFactorAuth ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <p className="mb-1 text-center text-sm text-muted-foreground">
                  We’ve sent a 6-digit code to your email.
                  <br />
                  Enter it below to continue.
                </p>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
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
          </>
        )}
        {error && <AlertBox variant="destructive" message={error} />}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader />
          ) : showTwoFactorAuth ? (
            'Confirm'
          ) : (
            'Log In'
          )}
        </Button>
        {showTwoFactorAuth && (
          <ResendTwoFactorCodeButton email={form.getValues().email} />
        )}
      </form>
    </Form>
  )
}
