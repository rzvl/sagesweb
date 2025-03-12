CREATE TABLE "users_oauth_accounts" (
	"user_id" uuid NOT NULL,
	"provider" "oauth_providers" NOT NULL,
	"provider_account_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_oauth_accounts_provider_account_id_provider_pk" PRIMARY KEY("provider_account_id","provider"),
	CONSTRAINT "users_oauth_accounts_provider_account_id_unique" UNIQUE("provider_account_id")
);
--> statement-breakpoint
ALTER TABLE "users_oauth_accounts" ADD CONSTRAINT "users_oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;