ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "sent_at" SET DEFAULT '2025-01-12T14:38:18.031Z';