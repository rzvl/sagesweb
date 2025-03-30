import 'server-only'

import { redisClient } from '@/server/db/redis'
import { generateRandomHex } from '@/lib/utils'
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from '@/lib/constants'
import { SessionCookie, UserSession } from '@/lib/types'

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: 'strict' | 'lax'
      maxAge?: number
    },
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, 'set'>,
) {
  const sessionId = generateRandomHex(64).normalize()
  await redisClient.json.set(`session:${sessionId}`, '$', user)
  await redisClient.expire(`session:${sessionId}`, SESSION_EXPIRATION_SECONDS)

  setCookie(sessionId, cookies)
}

export function getSessionId(cookies: Pick<Cookies, 'get'>) {
  const sessionCookie = cookies.get(COOKIE_SESSION_KEY)?.value

  if (!sessionCookie) return null

  const { sessionId } = JSON.parse(sessionCookie) as SessionCookie

  return sessionId
}

export async function getUserSessionById(sessionId: string) {
  const userSession = await redisClient.json.get<UserSession>(
    `session:${sessionId}`,
  )

  return userSession ?? null
}

export async function updateSessionExpiry(
  sessionId: string,
  cookies: Pick<Cookies, 'set'>,
) {
  await redisClient.expire(`session:${sessionId}`, SESSION_EXPIRATION_SECONDS)
  await setCookie(sessionId, cookies)
}

export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, 'get'>,
) {
  const sessionId = getSessionId(cookies)
  if (sessionId == null) return null

  await redisClient.json.set(`session:${sessionId}`, '$', user)
  await redisClient.expire(`session:${sessionId}`, SESSION_EXPIRATION_SECONDS)
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, 'get' | 'delete'>,
) {
  const sessionId = getSessionId(cookies)
  if (sessionId == null) return null

  await redisClient.del(`session:${sessionId}`)
  cookies.delete(COOKIE_SESSION_KEY)
}

async function setCookie(sessionId: string, cookies: Pick<Cookies, 'set'>) {
  const sessionData = JSON.stringify({
    sessionId,
    sessionExpiry: Date.now() + 1000 * SESSION_EXPIRATION_SECONDS,
  })

  cookies.set(COOKIE_SESSION_KEY, sessionData, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_EXPIRATION_SECONDS,
  })
}
