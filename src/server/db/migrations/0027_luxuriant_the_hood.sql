ALTER TABLE "emailVerificationTokens" RENAME TO "emailVerificationToken";--> statement-breakpoint
ALTER TABLE "emailVerificationToken" DROP CONSTRAINT "emailVerificationTokens_id_token_pk";--> statement-breakpoint
ALTER TABLE "emailVerificationToken" ALTER COLUMN "expiresAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "emailVerificationToken" ADD CONSTRAINT "emailVerificationToken_id_token_pk" PRIMARY KEY("id","token");