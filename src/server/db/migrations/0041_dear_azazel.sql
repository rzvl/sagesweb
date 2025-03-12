ALTER TABLE "emailVerificationToken" RENAME TO "email_verification_token";--> statement-breakpoint
ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "email_verification_token" RENAME COLUMN "expiresAt" TO "expires_at";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_username_unique";--> statement-breakpoint
ALTER TABLE "email_verification_token" DROP CONSTRAINT "emailVerificationToken_id_token_pk";--> statement-breakpoint
ALTER TABLE "email_verification_token" ADD CONSTRAINT "email_verification_token_id_token_pk" PRIMARY KEY("id","token");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");