import { drizzle } from 'drizzle-orm/neon-serverless'
import * as users from './schema/users'

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...users } })
