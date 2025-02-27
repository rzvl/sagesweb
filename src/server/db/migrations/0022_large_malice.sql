ALTER TABLE "token" RENAME TO "emailVerificationTokens";--> statement-breakpoint
ALTER TABLE "emailVerificationTokens" DROP CONSTRAINT "token_id_token_pk";--> statement-breakpoint
ALTER TABLE "emailVerificationTokens" ADD CONSTRAINT "emailVerificationTokens_id_token_pk" PRIMARY KEY("id","token");