'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { removeUserFromSession } from '@/server/data/session'
import { TResponse } from '@/lib/types'

export async function logout(): Promise<TResponse> {
  try {
    await removeUserFromSession(await cookies())
  } catch (error) {
    if (error instanceof Error) {
      return { success: true, message: error.message }
    } else {
      return { success: true, message: 'Something went wrong!' }
    }
  }
  redirect('/')
}
