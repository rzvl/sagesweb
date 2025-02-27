import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/server/db'
import {
  type SelectTokens,
  emailVerificationTokens,
  passwordResetTokens,
  twoFactorAuthTokens,
} from '@/server/db/schema/users'
import 'server-only'

type TokenType = 'emailVerification' | 'passwordReset' | 'twoFactorAuth'

async function generateToken(email: string, tokenType: TokenType) {
  const data = {
    emailVerification: {
      table: emailVerificationTokens,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // 24 hours
    },
    passwordReset: {
      table: passwordResetTokens,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 30), // 30 minutes
    },
    twoFactorAuth: {
      table: twoFactorAuthTokens,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 5), // 5 minutes
    },
  }[tokenType]

  const token = createId()

  const addedToken = await db
    .insert(data.table)
    .values({
      token,
      email,
      expiresAt: data.expiresAt,
    })
    .returning()

  return addedToken[0]
}

const getTokenByEmail = cache(async (email: string, tokenType: TokenType) => {
  let token: SelectTokens | undefined

  if (tokenType === 'emailVerification') {
    token = await db.query.emailVerificationTokens.findFirst({
      where: eq(emailVerificationTokens.email, email),
    })
  } else if (tokenType === 'passwordReset') {
    token = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    })
  } else if (tokenType === 'twoFactorAuth') {
    token = await db.query.twoFactorAuthTokens.findFirst({
      where: eq(twoFactorAuthTokens.email, email),
    })
  }

  if (!token) return null
  return token
})

const getTokenByToken = cache(async (token: string, tokenType: TokenType) => {
  let queriedToken: SelectTokens | undefined

  if (tokenType === 'emailVerification') {
    queriedToken = await db.query.emailVerificationTokens.findFirst({
      where: eq(emailVerificationTokens.token, token),
    })
  } else if (tokenType === 'passwordReset') {
    queriedToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    })
  } else if (tokenType === 'twoFactorAuth') {
    queriedToken = await db.query.twoFactorAuthTokens.findFirst({
      where: eq(twoFactorAuthTokens.token, token),
    })
  }

  if (!queriedToken) {
    return null
  }
  return queriedToken
})

async function deleteToken(token: string, tokenType: TokenType) {
  if (tokenType === 'emailVerification') {
    await db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.token, token))
  } else if (tokenType === 'passwordReset') {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
  } else if (tokenType === 'twoFactorAuth') {
    await db
      .delete(twoFactorAuthTokens)
      .where(eq(twoFactorAuthTokens.token, token))
  }
}

export { deleteToken, generateToken, getTokenByEmail, getTokenByToken }
