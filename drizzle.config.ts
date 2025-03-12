// import './envConfig'
import { env } from '@/env/server'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/server/db/schema',
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
})
