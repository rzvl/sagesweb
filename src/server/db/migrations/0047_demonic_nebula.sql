ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_id_token_pk";--> statement-breakpoint
ALTER TABLE "two_factor_auth_tokens" DROP CONSTRAINT "two_factor_auth_tokens_id_token_pk";--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "two_factor_auth_tokens" ADD PRIMARY KEY ("id");