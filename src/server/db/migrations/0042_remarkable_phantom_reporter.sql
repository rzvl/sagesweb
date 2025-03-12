ALTER TABLE "email_verification_token" RENAME TO "email_verification_tokens";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "two_factor_enabled" TO "is_two_factor_enabled";--> statement-breakpoint
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "email_verification_token_id_token_pk";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email_verified" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_id_token_pk" PRIMARY KEY("id","token");