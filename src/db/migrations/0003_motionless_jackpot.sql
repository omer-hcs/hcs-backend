ALTER TABLE "faqs" ADD COLUMN "category" varchar(100);--> statement-breakpoint
CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category");