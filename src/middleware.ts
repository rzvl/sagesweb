import { NextResponse, type NextRequest } from 'next/server'
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from '@/server/data/session'
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes'

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next()

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value })
    },
    get: (key) => request.cookies.get(key),
  })

  return response
}

async function middlewareAuth(request: NextRequest) {
  const { nextUrl } = request

  const user = await getUserFromSession(request.cookies)

  if (authRoutes.includes(nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
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
