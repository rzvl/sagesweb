ALTER TABLE "emailVerificationToken" ALTER COLUMN "sentAt" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "emailVerificationToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '24 hours';--> statement-breakpoint
ALTER TABLE "passwordResetToken" ALTER COLUMN "sentAt" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "passwordResetToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 minutes';--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" ALTER COLUMN "sentAt" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes';