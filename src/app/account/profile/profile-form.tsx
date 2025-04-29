'use client'

import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { AlertBox } from '@/components/common/alert-box'
import { Loader } from '@/components/common/loader'
import { UserAvatar } from '@/components/common/user-avatar'
import { User } from '@/lib/types'
import { UploadButton } from '@/lib/uploadthing'
import { UPLOADTHING_IMAGE_BASE_URL } from '@/lib/constants'
import { updateProfileSettings } from './update-profile'
import { editProfileSchema } from './schema'
import { deleteUploadthingFile } from './delete-uploadthing-file'

type ProfileFormProps = {
  user: User | null
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      image: user?.image || '',
      name: user?.name || '',
    },
  })

  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
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
              <FormLabel className="font-semibold">Profile Image</FormLabel>
              <div className="mb-4 flex items-center gap-8">
                <UserAvatar
                  src={form.getValues('image') || user?.image || undefined}
                  className="h-16 w-16"
                />
                <UploadButton
                  className="scale-90 ut-button:bg-primary/75 ut-button:text-primary-foreground ut-button:transition-all ut-button:duration-500 hover:ut-button:bg-primary/100 ut-allowed-content:hidden ut-label:hidden"
                  endpoint="avatarUploader"
                  onUploadBegin={() => {
                    setAvatarUploading(true)
                  }}
                  onUploadError={(error: Error) => {
                    form.setError('image', {
                      type: 'upload',
                      message: error.message,
                    })
                    setAvatarUploading(false)
                    return
                  }}
                  onClientUploadComplete={(res) => {
                    form.setValue('image', res[0].ufsUrl)
                    if (
                      user?.image &&
                      user.image.startsWith(UPLOADTHING_IMAGE_BASE_URL)
                    ) {
                      const fileKey = user?.image.split('/').at(-1)
                      if (fileKey) {
                        deleteUploadthingFile(fileKey)
                      }
                    }
                    setAvatarUploading(false)
                    return
                  }}
                />
              </div>
              <FormControl>
                <Input type="hidden" {...field} />
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
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting || avatarUploading}
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
          disabled={form.formState.isSubmitting || avatarUploading}
          className="w-full"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Save Profile'}
        </Button>
      </form>
    </Form>
  )
}
