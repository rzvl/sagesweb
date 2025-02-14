ALTER TABLE "user" ALTER COLUMN "authProvider" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "authProvider" DROP NOT NULL;