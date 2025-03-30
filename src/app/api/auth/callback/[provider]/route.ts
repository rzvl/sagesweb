export const runtime = 'nodejs'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { db } from '@/server/db'
import { getOAuthClient } from '@/server/oauth/base'
import { createUserSession } from '@/server/data/session'
import {
  OAuthProvider,
  oauthProviders,
  usersOAuthAccounts,
  users,
} from '@/server/db/schema/users'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const provider = z.enum(oauthProviders).parse(rawProvider)

  if (typeof code !== 'string' || typeof state !== 'string') {
    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again.',
      )}`,
    )
  }

  const oAuthClient = getOAuthClient(provider)
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies())
    const user = await connectUserToAccount(oAuthUser, provider)
    await createUserSession(
      {
        id: user.id,
        role: user.role,
      },
      await cookies(),
    )
  } catch (error) {
    console.error(error)
    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again.',
      )}`,
    )
  }

  redirect(DEFAULT_LOGIN_REDIRECT)
}

function connectUserToAccount(
  {
    id,
    email,
    name,
    image,
  }: { id: string; email: string; name: string; image: string | null },
  provider: OAuthProvider,
) {
  return db.transaction(async (trx) => {
    let user = await trx.query.users.findFirst({
      where: eq(users.email, email),
      columns: { id: true, role: true },
    })

    if (user == null) {
      const [newUser] = await trx
        .insert(users)
        .values({
          email,
          name,
          image,
        })
        .returning({ id: users.id, role: users.role })
      user = newUser
    }

    await trx
      .insert(usersOAuthAccounts)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id,
      })
      .onConflictDoNothing()

    return user
  })
}
