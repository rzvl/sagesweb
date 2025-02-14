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

const RoleEnum = pgEnum('roles', ['seeker', 'teacher', 'admin'])
const TokenTypeEnum = pgEnum('tokenTypes', [
  'emailVerification',
  'passwordReset',
])

const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique().notNull(),
  username: text('username').unique(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: RoleEnum('role').notNull().default('seeker'),
  authProvider: text('authProvider'),
})

const accounts = pgTable(
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

const tokens = pgTable(
  'token',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    token: text('token').notNull(),
    sentAt: timestamp('sentAt', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    email: text('email').notNull(),
    tokenType: TokenTypeEnum('tokenType').notNull(),
  },
  (token) => ({
    pk: primaryKey({
      columns: [token.id, token.token],
    }),
  }),
)

const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
)

type UserRole = (typeof RoleEnum)['enumValues'][number]
type TokenType = (typeof TokenTypeEnum)['enumValues'][number]
type SelectUser = typeof users.$inferSelect
type InsertUser = typeof users.$inferInsert
type SelectToken = typeof tokens.$inferSelect
type InsertToken = typeof tokens.$inferInsert

export { users, accounts, tokens, authenticators, RoleEnum, TokenTypeEnum }

export type {
  UserRole,
  TokenType,
  SelectUser,
  InsertUser,
  SelectToken,
  InsertToken,
}
