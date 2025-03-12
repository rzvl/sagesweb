ALTER TABLE "users_table" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "users_table" RENAME COLUMN "twoFactorEnabled" TO "two_factor_enabled";--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "salt" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp NOT NULL;