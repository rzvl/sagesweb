import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { InsertUser, users } from '@/server/db/schema/users'
import type { Signup } from '@/lib/validations/auth'
import { replaceEmptyWithNull } from '@/lib/utils'
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

async function addUser(user: Signup) {
  await db.insert(users).values(user)
}

async function updateUser(id: string, values: Partial<InsertUser>) {
  await db
    .update(users)
    .set(replaceEmptyWithNull(values))
    .where(eq(users.id, id))
}

function getCurrentUser() {
  return {
    id: '1',
    username: 'reza',
    role: 'admin',
    image: 'https://avatars.githubusercontent.com/u/10198792?v=4',
    email: 'reza.shabani@gmail.com',
    name: 'Reza Shabani',
  }
}

export {
  addUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
  getCurrentUser,
}
