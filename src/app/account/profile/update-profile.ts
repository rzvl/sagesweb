'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { TResponse } from '@/lib/types'
import { updateUser } from '@/server/data/user'
import { editProfileSchema } from './schema'

export async function updateProfileSettings(
  id: string,
  values: z.infer<typeof editProfileSchema>,
): Promise<TResponse> {
  try {
    const validatedFields = editProfileSchema.safeParse(values)
    if (!validatedFields.success) {
      throw new Error('Invalid profile settings')
    }

    const { image, name } = validatedFields.data

    await updateUser(id, { image, name })

    revalidatePath('/account/profile')

    return { success: true, message: 'Profile settings updated successfully!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong!' }
    }
  }
}
