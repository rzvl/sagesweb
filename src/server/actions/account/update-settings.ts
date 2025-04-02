'use server'

import { TResponse } from '@/lib/types'
import { updateUser } from '@/server/data/user'
import { revalidatePath } from 'next/cache'

export async function Toggle2FA(
  id: string,
  isTwoFactorEnabled: boolean,
): Promise<TResponse> {
  try {
    await updateUser(id, { isTwoFactorEnabled })

    revalidatePath('/account/settings')

    return { success: true, message: 'Two Factor Authentication updated!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Something went wrong!' }
    }
  }
}
