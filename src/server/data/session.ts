import 'server-only'

import { generateRandomHex } from '@/lib/utils'
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from '@/lib/constants'
import { SessionCookie, UserSession } from '@/lib/types'
import { redisClient } from '@/server/db/redis'

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

export function getSessionCookie(cookies: Pick<Cookies, 'get'>): SessionCookie {
  const sessionCookie = cookies.get(COOKIE_SESSION_KEY)?.value

  if (!sessionCookie) return { sessionId: null, sessionExpiry: null }

  return JSON.parse(sessionCookie)
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
  const { sessionId } = getSessionCookie(cookies)
  if (!sessionId) return

  await redisClient.json.set(`session:${sessionId}`, '$', user)
  await redisClient.expire(`session:${sessionId}`, SESSION_EXPIRATION_SECONDS)
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, 'get' | 'delete'>,
) {
  const { sessionId } = getSessionCookie(cookies)
  if (!sessionId) return

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
