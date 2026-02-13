import { pgTable, serial, varchar, text, jsonb, integer } from 'drizzle-orm/pg-core';

export const aboutPageContent = pgTable('about_page_content', {
  id: serial('id').primaryKey(),
  // Page Intro
  introHeadline: varchar('intro_headline', { length: 255 }),
  introImageUrl: varchar('intro_image_url', { length: 500 }),
  missionStatement: text('mission_statement'),
  // Core Values (JSONB list of { title, description })
  coreValues: jsonb('core_values'),
});

export const aboutTimeline = pgTable('about_timeline', {
  id: serial('id').primaryKey(),
  year: integer('year').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
});

export type AboutPageContent = typeof aboutPageContent.$inferSelect;
export type AboutTimeline = typeof aboutTimeline.$inferSelect;
