import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { redisClient } from '@/server/db/redis'
import { users } from '@/server/db/schema/users'
import { getSessionCookie } from '@/server/data/session'
import type { UserSession, User } from '@/lib/types'

export const verifySession = cache(async () => {
  const { sessionId } = getSessionCookie(await cookies())

  if (!sessionId) return null

  const userSession = await redisClient.json.get<UserSession>(
    `session:${sessionId}`,
  )

  return userSession ?? null
})

export const getCurrentUser = cache(async () => {
  const userSession = await verifySession()

  if (!userSession) return null

  return await getUserFromDb(userSession.id)
})

async function getUserFromDb(id: string): Promise<User | null> {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      role: true,
      name: true,
      username: true,
      image: true,
      isTwoFactorEnabled: true,
    },
    where: eq(users.id, id),
  })

  if (!user) return null

  return user
}
