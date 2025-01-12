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
  })

  return verificationToken[0]
}

async function getVerificationTokenByEmail(email: string) {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  })
  return verificationToken
}

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
}
