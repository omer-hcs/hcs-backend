import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
  jsonb,
} from 'drizzle-orm/pg-core';

export const articles = pgTable(
  'articles',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    category: varchar('category', { length: 100 }),
    readTime: integer('read_time'),
    excerpt: text('excerpt'),
    topicsCovered: jsonb('topics_covered'),
    contentBody: text('content_body').notNull(),
    publishedDate: timestamp('published_date', { withTimezone: true }).defaultNow(),
    isPublished: boolean('is_published').notNull().default(false),
  },
  (table) => [
    index('articles_slug_idx').on(table.slug),
  ],
);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
