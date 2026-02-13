import { Inject, Injectable } from '@nestjs/common';
import { asc } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import { faqs } from '../../db/schema';

@Injectable()
export class FaqsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll() {
    return this.db
      .select()
      .from(faqs)
      .orderBy(asc(faqs.orderIndex));
  }
}
