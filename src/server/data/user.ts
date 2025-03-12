import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { type InsertUser, users } from '@/server/db/schema/users'
import { replaceEmptyWithNull } from '@/lib/utils'
import 'server-only'

export const getUserByEmail = cache(async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  if (!user) return null
  return user
})

export const getUserById = cache(async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })
  if (!user) return null
  return user
})

export const getUserByUsername = cache(async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (!user) return null
  return user
})

export async function addUser(user: InsertUser) {
  await db.insert(users).values(user)
}

export async function updateUser(id: string, values: Partial<InsertUser>) {
  await db
    .update(users)
    .set(replaceEmptyWithNull(values))
    .where(eq(users.id, id))
}
