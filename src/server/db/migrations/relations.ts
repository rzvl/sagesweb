import { relations } from "drizzle-orm/relations";
import { user, authenticator, account } from "./schema";

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	authenticators: many(authenticator),
	accounts: many(account),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));