CREATE TABLE "homepage_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_headline" varchar(255),
	"hero_subheadline" text,
	"stats" jsonb,
	"partner_logos" jsonb,
	"why_us" jsonb,
	"cta_headline" varchar(255),
	"cta_subheadline" text
);
--> statement-breakpoint
CREATE TABLE "about_page_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"intro_headline" varchar(255),
	"mission_statement" text,
	"core_values" jsonb
);
--> statement-breakpoint
CREATE TABLE "about_timeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "clinic_settings" ALTER COLUMN "address" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "features" jsonb;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "excerpt" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "topics_covered" jsonb;--> statement-breakpoint
ALTER TABLE "clinic_settings" ADD COLUMN "social_links" jsonb;--> statement-breakpoint
ALTER TABLE "clinic_settings" ADD COLUMN "operating_hours" jsonb;