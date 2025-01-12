import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { AuthFormData } from '@/lib/types'
import 'server-only'

async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  return user
}

async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })
  return user
}

async function addUser(user: AuthFormData) {
  await db.insert(users).values(user)
}

export { addUser, getUserByEmail, getUserById }
