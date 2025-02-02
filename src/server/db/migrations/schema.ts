import {
  pgTable,
  foreignKey,
  unique,
  text,
  integer,
  boolean,
  timestamp,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core'
// import { sql } from "drizzle-orm"

export const tokenTypes = pgEnum('tokenTypes', [
  'emailVerification',
  'passwordReset',
])

export const authenticator = pgTable(
  'authenticator',
  {
    credentialId: text().notNull(),
    userId: text().notNull(),
    providerAccountId: text().notNull(),
    credentialPublicKey: text().notNull(),
    counter: integer().notNull(),
    credentialDeviceType: text().notNull(),
    credentialBackedUp: boolean().notNull(),
    transports: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'authenticator_userId_user_id_fk',
    }).onDelete('cascade'),
    unique('authenticator_credentialID_unique').on(table.credentialId),
  ],
)

export const user = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text(),
    email: text(),
    password: text(),
    emailVerified: timestamp({ mode: 'string' }),
    image: text(),
    twoFactorEnabled: boolean().default(false),
  },
  (table) => [unique('user_email_unique').on(table.email)],
)

export const token = pgTable(
  'token',
  {
    id: text().notNull(),
    token: text().notNull(),
    sentAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    email: text().notNull(),
    tokenType: tokenTypes().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.token], name: 'token_id_token_pk' }),
  ],
)

export const account = pgTable(
  'account',
  {
    userId: text().notNull(),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: text('token_type'),
    scope: text(),
    idToken: text('id_token'),
    sessionState: text('session_state'),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'account_userId_user_id_fk',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.provider, table.providerAccountId],
      name: 'account_provider_providerAccountId_pk',
    }),
  ],
)
