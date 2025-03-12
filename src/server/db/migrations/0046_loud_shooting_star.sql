ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "email_verification_tokens_id_token_pk";--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD PRIMARY KEY ("id");