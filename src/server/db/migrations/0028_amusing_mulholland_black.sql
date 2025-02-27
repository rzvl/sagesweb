CREATE TABLE "passwordResetToken" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "passwordResetToken_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
CREATE TABLE "twoFactorAuthToken" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "twoFactorAuthToken_id_token_pk" PRIMARY KEY("id","token")
);
