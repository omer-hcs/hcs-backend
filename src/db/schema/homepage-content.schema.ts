import { pgTable, serial, varchar, text, jsonb } from 'drizzle-orm/pg-core';

export const homepageContent = pgTable('homepage_content', {
  id: serial('id').primaryKey(),
  // Hero Section
  heroHeadline: varchar('hero_headline', { length: 255 }),
  heroSubheadline: text('hero_subheadline'),
  heroImageUrl: varchar('hero_image_url', { length: 500 }),
  // Stats Section (JSONB list of { label, value })
  stats: jsonb('stats'),
  // Partner Logos (JSONB list of URLs or image objects)
  partnerLogos: jsonb('partner_logos'),
  // Why UsSection (JSONB list of { title, description })
  whyUs: jsonb('why_us'),
  whyUsHeadline: varchar('why_us_headline', { length: 255 }),
  whyUsSubheadline: text('why_us_subheadline'),
  // CTA Block
  ctaHeadline: varchar('cta_headline', { length: 255 }),
  ctaSubheadline: text('cta_subheadline'),
});

export type HomepageContent = typeof homepageContent.$inferSelect;
export type NewHomepageContent = typeof homepageContent.$inferInsert;
