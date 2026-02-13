import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class HomepageContentService {
  constructor(
    @Inject(DRIZZLE)
    private db: DrizzleDB,
  ) {}

  async findOne() {
    const records = await this.db.select().from(schema.homepageContent);
    return records[0] || null;
  }

  async create(data: any) {
    const [record] = await this.db
      .insert(schema.homepageContent)
      .values(data)
      .returning();
    return record;
  }

  async update(id: number, data: any) {
    const [record] = await this.db
      .update(schema.homepageContent)
      .set(data)
      .where(eq(schema.homepageContent.id, id))
      .returning();
    
    if (!record) throw new NotFoundException('Homepage content not found');
    return record;
  }
}
