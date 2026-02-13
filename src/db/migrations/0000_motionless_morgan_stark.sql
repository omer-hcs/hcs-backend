CREATE TYPE "public"."interest_type" AS ENUM('hearing_test', 'hearing_aid', 'tinnitus', 'consultation', 'other');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'qualified', 'converted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."product_style" AS ENUM('RIC', 'BTE', 'CIC');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"interest_type" "interest_type" DEFAULT 'consultation' NOT NULL,
	"message" text,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"style" "product_style" NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"image_url" varchar(500),
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"feature_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" varchar(100),
	"read_time" integer,
	"content_body" text NOT NULL,
	"published_date" timestamp with time zone DEFAULT now(),
	"is_published" boolean DEFAULT false NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"duration" varchar(100),
	"is_free" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_inclusions" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"inclusion_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clinic_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(50),
	"email" varchar(255),
	"address" varchar(500),
	"weekday_hours" varchar(100),
	"saturday_hours" varchar(100),
	"sunday_hours" varchar(100)
);
--> statement-breakpoint
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_inclusions" ADD CONSTRAINT "service_inclusions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "products_style_idx" ON "products" USING btree ("style");--> statement-breakpoint
CREATE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");