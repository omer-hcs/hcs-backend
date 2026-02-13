import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  duration: varchar('duration', { length: 100 }),
  isFree: boolean('is_free').notNull().default(false),
  imageUrl: varchar('image_url', { length: 500 }),
  inclusions: jsonb('inclusions'),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
