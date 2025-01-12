import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { AdapterAccountType } from 'next-auth/adapters'
import { createId } from '@paralleldrive/cuid2'

export const RoleEnum = pgEnum('roles', ['user', 'admin'])

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: RoleEnum('role').default('user'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    pk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const verificationTokens = pgTable(
  'verificationToken',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    token: text('token').notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .default(new Date()),
    email: text('email').notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.id, verificationToken.token],
      }),
    },
  ],
)

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type SelectAccount = typeof accounts.$inferSelect
export type InsertAccount = typeof accounts.$inferInsert
export type SelectVerificationToken = typeof verificationTokens.$inferSelect
export type InsertVerificationToken = typeof verificationTokens.$inferInsert
