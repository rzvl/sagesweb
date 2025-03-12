import { drizzle } from 'drizzle-orm/neon-serverless'
import { env } from '@/env/server'
import * as users from './schema/users'

export const db = drizzle(env.DATABASE_URL!, { schema: { ...users } })
