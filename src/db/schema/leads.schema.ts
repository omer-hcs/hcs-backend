import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';

export const interestTypeEnum = pgEnum('interest_type', [
  'hearing_test',
  'hearing_aid',
  'tinnitus',
  'consultation',
  'other',
]);

export const leadStatusEnum = pgEnum('lead_status', [
  'new',
  'contacted',
  'qualified',
  'converted',
  'closed',
]);

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }).notNull(),
    interestType: interestTypeEnum('interest_type').notNull().default('consultation'),
    message: text('message'),
    status: leadStatusEnum('status').notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('leads_created_at_idx').on(table.createdAt),
    index('leads_status_idx').on(table.status),
  ],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
