import { pgTable, serial, text, integer, varchar, index } from 'drizzle-orm/pg-core';

export const faqs = pgTable(
  'faqs',
  {
    id: serial('id').primaryKey(),
    category: varchar('category', { length: 100 }),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    orderIndex: integer('order_index').notNull().default(0),
  },
  (table) => [
    index('faqs_category_idx').on(table.category),
  ],
);

export type Faq = typeof faqs.$inferSelect;
export type NewFaq = typeof faqs.$inferInsert;
