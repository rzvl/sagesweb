'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { type EditProfile, editProfileSchema } from '@/lib/validations/account'
import { AlertBox, Loader, UserAvatar } from '@/components/elements'
import { updateProfileSettings } from '@/server/actions/auth'
import { User } from '@/lib/types'

type ProfileFormProps = {
  user: User | null
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      image: user?.image || '',
      name: user?.name || '',
    },
  })

  const onSubmit = async (values: EditProfile) => {
    setError('')
    setSuccess('')

    if (!user?.id) {
      return
    }

    const response = await updateProfileSettings(user?.id, values)

    if (response.success) {
      setSuccess(response.message)
      toast.success(response.message)
    } else {
      setError(response.message)
      toast.error(response.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-96 gap-4"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 flex flex-col items-center gap-4">
                <FormLabel className="font-semibold">Profile Image</FormLabel>
                <UserAvatar
                  src={form.getValues('image') || user?.image || undefined}
                  className="h-28 w-28"
                />
              </div>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="John Doe"
                  type="hidden"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="John Doe"
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
          {form.formState.isSubmitting ? <Loader /> : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
