import { relations, sql } from 'drizzle-orm'
import {
  timestamp,
  pgTable,
  text,
  boolean,
  pgEnum,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const userRoles = ['seeker', 'teacher', 'admin'] as const
export type UserRole = (typeof userRoles)[number]
export const RoleEnum = pgEnum('roles', userRoles)

export const oauthProviders = ['google'] as const
export type OAuthProvider = (typeof oauthProviders)[number]
export const OAuthProviderEnum = pgEnum('oauth_providers', ['google', 'apple'])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').unique().notNull(),
  username: text('username').unique(),
  password: text('password'),
  emailVerified: timestamp('email_verified', { withTimezone: true }),
  image: text('image'),
  isTwoFactorEnabled: boolean('is_two_factor_enabled').default(false),
  role: RoleEnum('role').notNull().default('seeker'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  oAuthAccounts: many(usersOAuthAccounts),
}))

export const usersOAuthAccounts = pgTable(
  'users_oauth_accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: OAuthProviderEnum('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })],
)

export const usersOAuthAccountsRelations = relations(
  usersOAuthAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [usersOAuthAccounts.userId],
      references: [users.id],
    }),
  }),
)

export const emailVerificationTokens = pgTable('email_verification_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  token: text('token').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
  })
    .notNull()
    .default(sql`NOW() + INTERVAL '24 hours'`),
  email: text('email').notNull(),
})

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  token: text('token').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
  })
    .notNull()
    .default(sql`NOW() + INTERVAL '30 minutes'`),
  email: text('email').notNull(),
})

export const twoFactorAuthTokens = pgTable('two_factor_auth_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  token: text('token').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
  })
    .notNull()
    .default(sql`NOW() + INTERVAL '5 minutes'`),
  email: text('email').notNull(),
})

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type SelectTokens = typeof emailVerificationTokens.$inferSelect
export type InsertTokens = typeof emailVerificationTokens.$inferInsert
export type SelectUserOAuthAccounts = typeof usersOAuthAccounts.$inferSelect
export type InsertUserOAuthAccounts = typeof usersOAuthAccounts.$inferInsert
