import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { signupSchema } from '@/lib/validations'
import 'server-only'

const getUserByEmail = cache(async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  if (!user) return null
  return user
})

const getUserById = cache(async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })
  if (!user) return null
  return user
})

async function addUser(user: z.infer<typeof signupSchema>) {
  await db.insert(users).values(user)
}

async function updateUserVerification(id: string) {
  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.id, id))
}

const preloadUserByEmail = (email: string) => {
  void getUserByEmail(email)
}

const preloadUserById = (id: string) => {
  void getUserById(id)
}

export {
  addUser,
  getUserByEmail,
  getUserById,
  updateUserVerification,
  preloadUserByEmail,
  preloadUserById,
}
