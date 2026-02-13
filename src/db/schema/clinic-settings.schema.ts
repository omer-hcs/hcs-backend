import { pgTable, serial, varchar, jsonb, text } from 'drizzle-orm/pg-core';

export const clinicSettings = pgTable('clinic_settings', {
  id: serial('id').primaryKey(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }),
  socialLinks: jsonb('social_links'),
  operatingHours: jsonb('operating_hours'),
  // Legacy fields for backward compatibility if needed, though CMS will favor JSONB
  weekdayHours: varchar('weekday_hours', { length: 100 }),
  saturdayHours: varchar('saturday_hours', { length: 100 }),
  sundayHours: varchar('sunday_hours', { length: 100 }),
  // Map Coordinates for precise pinning
  mapLat: varchar('map_lat', { length: 50 }),
  mapLng: varchar('map_lng', { length: 50 }),
});

export type ClinicSetting = typeof clinicSettings.$inferSelect;
export type NewClinicSetting = typeof clinicSettings.$inferInsert;
