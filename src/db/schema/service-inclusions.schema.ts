import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { services } from './services.schema';

export const serviceInclusions = pgTable('service_inclusions', {
  id: serial('id').primaryKey(),
  serviceId: integer('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  inclusionText: text('inclusion_text').notNull(),
});

export const serviceInclusionsRelations = relations(serviceInclusions, ({ one }) => ({
  service: one(services, {
    fields: [serviceInclusions.serviceId],
    references: [services.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  inclusions: many(serviceInclusions),
}));

export type ServiceInclusion = typeof serviceInclusions.$inferSelect;
export type NewServiceInclusion = typeof serviceInclusions.$inferInsert;
