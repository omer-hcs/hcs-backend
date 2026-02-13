import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AboutPageService {
  constructor(
    @Inject(DRIZZLE)
    private db: DrizzleDB,
  ) {}

  // --- Page Content (Singleton) ---
  async findContent() {
    const records = await this.db.select().from(schema.aboutPageContent);
    return records[0] || null;
  }

  async createContent(data: any) {
    const [record] = await this.db.insert(schema.aboutPageContent).values(data).returning();
    return record;
  }

  async updateContent(id: number, data: any) {
    const [record] = await this.db
      .update(schema.aboutPageContent)
      .set(data)
      .where(eq(schema.aboutPageContent.id, id))
      .returning();
    if (!record) throw new NotFoundException();
    return record;
  }

  // --- Timeline (Collection) ---
  async findTimeline() {
    return this.db.select().from(schema.aboutTimeline).orderBy(schema.aboutTimeline.year);
  }

  async createMilestone(data: any) {
    const [record] = await this.db.insert(schema.aboutTimeline).values(data).returning();
    return record;
  }

  async updateMilestone(id: number, data: any) {
    const [record] = await this.db
      .update(schema.aboutTimeline)
      .set(data)
      .where(eq(schema.aboutTimeline.id, id))
      .returning();
    return record;
  }

  async deleteMilestone(id: number) {
    await this.db.delete(schema.aboutTimeline).where(eq(schema.aboutTimeline.id, id));
    return { success: true };
  }
}
