ALTER TABLE "emailVerificationToken" ALTER COLUMN "sentAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "passwordResetToken" ALTER COLUMN "sentAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" ALTER COLUMN "sentAt" SET DEFAULT now();