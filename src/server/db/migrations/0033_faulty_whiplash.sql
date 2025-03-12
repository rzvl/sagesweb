ALTER TABLE "user" RENAME TO "users_table";--> statement-breakpoint
ALTER TABLE "users_table" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "users_table" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_username_unique" UNIQUE("username");