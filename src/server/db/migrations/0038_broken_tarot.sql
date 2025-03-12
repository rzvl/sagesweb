ALTER TABLE "emailVerificationToken" DROP CONSTRAINT "emailVerificationToken_id_token_pk";--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP CONSTRAINT "passwordResetToken_id_token_pk";--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" DROP CONSTRAINT "twoFactorAuthToken_id_token_pk";--> statement-breakpoint
ALTER TABLE "emailVerificationToken" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "twoFactorAuthToken" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN "id";