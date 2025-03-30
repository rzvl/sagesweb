import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { COOKIE_SESSION_KEY } from '@/lib/constants'
import { users } from '@/server/db/schema/users'
import { SessionCookie, User, UserSession } from '@/lib/types'
import { redisClient } from '../db/redis'

export const getSessionCookie = cache(async (): Promise<SessionCookie> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_SESSION_KEY)?.value

  if (!sessionCookie) return { sessionId: null, sessionExpiry: null }

  return JSON.parse(sessionCookie)
})

export const verifySession = cache(async () => {
  const { sessionId } = await getSessionCookie()

  if (!sessionId) return null

  const userSession = await redisClient.json.get<UserSession>(
    `session:${sessionId}`,
  )

  return userSession ?? null
})

export const getUser = cache(async () => {
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
    },
    where: eq(users.id, id),
  })

  if (!user) return null

  return user
}
