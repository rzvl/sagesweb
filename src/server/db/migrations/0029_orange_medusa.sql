ALTER TABLE "emailVerificationToken" ADD COLUMN "sentAt" timestamp DEFAULT '2025-02-27 14:30:06.150' NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordResetToken" ADD COLUMN "sentAt" timestamp DEFAULT '2025-02-27 14:30:06.151' NOT NULL;--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" ADD COLUMN "sentAt" timestamp DEFAULT '2025-02-27 14:30:06.151' NOT NULL;