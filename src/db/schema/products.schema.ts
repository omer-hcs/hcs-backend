import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  pgEnum,
  index,
  jsonb,
} from 'drizzle-orm/pg-core';

export const productStyleEnum = pgEnum('product_style', ['RIC', 'BTE', 'CIC']);

export const products = pgTable(
  'products',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    style: productStyleEnum('style').notNull(),
    price: integer('price').notNull(),
    description: text('description'),
    imageUrl: varchar('image_url', { length: 500 }),
    features: jsonb('features'),
    isActive: boolean('is_active').notNull().default(true),
  },
  (table) => [
    index('products_style_idx').on(table.style),
  ],
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
