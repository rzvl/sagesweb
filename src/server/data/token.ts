import { cache } from 'react'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/server/db'
import { InsertVerificationToken, verificationTokens } from '@/server/db/schema'
import 'server-only'

async function generateVerificationToken(email: string) {
  const token = createId()
  const verificationToken = await addVerificationToken({
    token,
    email,
    sentAt: new Date(),
  })

  return verificationToken[0]
}

const getVerificationTokenByEmail = cache(async (email: string) => {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  })
  if (!verificationToken) return null
  return verificationToken
})

const getVerificationTokenByToken = cache(async (token: string) => {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  })
  if (!verificationToken) return null
  return verificationToken
})

async function deleteVerificationToken(token: string) {
  await db.delete(verificationTokens).where(eq(verificationTokens.token, token))
}

async function addVerificationToken(values: InsertVerificationToken) {
  return await db.insert(verificationTokens).values(values).returning()
}

export {
  addVerificationToken,
  deleteVerificationToken,
  generateVerificationToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
}
