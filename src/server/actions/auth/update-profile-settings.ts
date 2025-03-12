'use server'

import { TResponse } from '@/lib/types'
import { EditProfile, editProfileSchema } from '@/lib/validations/account'
import { updateUser } from '@/server/data/user'
import { revalidatePath } from 'next/cache'

export async function updateProfileSettings(
  id: string,
  values: EditProfile,
): Promise<TResponse> {
  try {
    const validatedFields = editProfileSchema.safeParse(values)
    if (!validatedFields.success) {
      throw new Error('Invalid profile settings')
    }

    await updateUser(id, values)

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
