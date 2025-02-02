import { cache } from 'react'
import { and, eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/server/db'
import { tokens } from '@/server/db/schema'
import type { InsertToken, TokenType } from '@/server/db/schema'
import 'server-only'

async function generateToken(email: string, tokenType: TokenType) {
  const token = createId()
  const addedToken = await addToken({
    token,
    email,
    tokenType,
    sentAt: new Date(),
  })

  return addedToken[0]
}

const getTokenByEmail = cache(async (email: string, tokenType: TokenType) => {
  const token = await db.query.tokens.findFirst({
    where: and(eq(tokens.email, email), eq(tokens.tokenType, tokenType)),
  })
  if (!token) return null
  return token
})

const getTokenByToken = cache(async (token: string) => {
  const existingToken = await db.query.tokens.findFirst({
    where: eq(tokens.token, token),
  })
  if (!existingToken) return null
  return existingToken
})

async function deleteToken(token: string) {
  await db.delete(tokens).where(eq(tokens.token, token))
}

async function addToken(values: InsertToken) {
  return await db.insert(tokens).values(values).returning()
}

export {
  addToken,
  deleteToken,
  generateToken,
  getTokenByEmail,
  getTokenByToken,
}
