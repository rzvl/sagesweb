import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/server/db'
import {
  emailVerificationTokens,
  passwordResetTokens,
  twoFactorAuthTokens,
} from '@/server/db/schema/users'
import 'server-only'

const tables = {
  emailVerification: emailVerificationTokens,
  passwordReset: passwordResetTokens,
  twoFactorAuth: twoFactorAuthTokens,
}

type TokenType = 'emailVerification' | 'passwordReset' | 'twoFactorAuth'

async function generateToken(email: string, tokenType: TokenType) {
  const tokenTable = tables[tokenType]
  const token =
    tokenType === 'twoFactorAuth'
      ? (await generateRandomSixDigitNumber()).toString()
      : createId()

  const addedToken = await db
    .insert(tokenTable)
    .values({ token, email })
    .returning()

  return addedToken[0]
}

const getTokenByEmail = cache(async (email: string, tokenType: TokenType) => {
  const tokenTable = tables[tokenType]
  const token = await db
    .select()
    .from(tokenTable)
    .where(eq(tokenTable.email, email))
    .limit(1)

  if (!token[0]) return null
  return token[0]
})

const getTokenByToken = cache(async (token: string, tokenType: TokenType) => {
  const tokenTable = tables[tokenType]
  const query = await db
    .select()
    .from(tokenTable)
    .where(eq(tokenTable.token, token))
    .limit(1)

  if (!query[0]) {
    return null
  }
  return query[0]
})

async function deleteToken(token: string, tokenType: TokenType) {
  const tokenTable = tables[tokenType]

  await db.delete(tokenTable).where(eq(tokenTable.token, token))
}

async function generateRandomSixDigitNumber() {
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  return (randomBuffer[0] % 900000) + 100000
}

export { deleteToken, generateToken, getTokenByEmail, getTokenByToken }
