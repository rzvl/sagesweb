ALTER TABLE "verificationToken" ALTER COLUMN "sent_at" SET DEFAULT '2025-01-12T14:48:43.653Z';--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_id_token_pk" PRIMARY KEY("id","token");