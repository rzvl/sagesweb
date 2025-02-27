'use client'

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
import { type EditProfile, editProfileSchema } from '@/lib/validations/account'
import { Loader, UserAvatar } from '@/components/elements'
import type { Session } from 'next-auth'

export default function ProfileForm({ session }: { session: Session | null }) {
  const form = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: '',
      image: '',
    },
  })

  const onSubmit = async (values: EditProfile) => {
    // TODO
    console.log(values)
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
                  src={
                    form.getValues('image') || session?.user.image || undefined
                  }
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
        {/* {error && <AlertBox variant="destructive" message={error} />} */}
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
