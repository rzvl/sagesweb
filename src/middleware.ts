import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { authRoutes } from '@/routes'
import { SESSION_EXPIRATION_SECONDS } from '@/lib/constants'
import { getSessionCookie } from '@/server/data/session'
import { updateSessionExpiry } from '@/server/data/session'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  const { sessionId, sessionExpiry } = getSessionCookie(await cookies())

  if (!sessionId || !sessionExpiry) {
    return NextResponse.next()
  }

  if (Date.now() > sessionExpiry - 1000 * (SESSION_EXPIRATION_SECONDS / 2)) {
    const cookieStore = await cookies()
    await updateSessionExpiry(sessionId, cookieStore)
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute && sessionId) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
