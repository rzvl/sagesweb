CREATE TABLE "password_reset_tokens" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone DEFAULT NOW() + INTERVAL '30 minutes' NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "password_reset_tokens_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DROP TABLE "passwordResetToken" CASCADE;