import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import type { SignupSchema } from '@/lib/validations'
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

const getUserByUsername = cache(async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (!user) return null
  return user
})

async function addUser(user: SignupSchema) {
  await db.insert(users).values(user)
}

async function updateUsername(id: string, username: string) {
  await db.update(users).set({ username }).where(eq(users.id, id))
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
  getUserByUsername,
  preloadUserByEmail,
  preloadUserById,
  updateUsername,
  updateUserVerification,
}
