ALTER TABLE "verificationToken" RENAME TO "token";--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "verificationToken_id_token_pk";--> statement-breakpoint
ALTER TABLE "token" ADD CONSTRAINT "token_id_token_pk" PRIMARY KEY("id","token");