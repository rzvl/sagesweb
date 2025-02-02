'use server'

import { signOut } from '@/server/auth'

export default async function logout() {
  try {
    await signOut({ redirect: false })
    return { success: true, message: 'You have been logged out!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: (error as Error).message }
    } else {
      return { success: false, message: 'Something went wrong' }
    }
  }
}
