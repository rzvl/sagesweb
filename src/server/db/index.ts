import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schemas from './schema'

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schemas } })
