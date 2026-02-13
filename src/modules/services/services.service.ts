import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import { services, serviceInclusions } from '../../db/schema';

@Injectable()
export class ServicesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll() {
    return this.db.select().from(services);
  }

  async findOne(id: number) {
    const [service] = await this.db.select().from(services).where(eq(services.id, id));
    if (!service) throw new NotFoundException(`Service with ID "${id}" not found`);
    return service;
  }

  async create(data: any) {
    const [service] = await this.db.insert(services).values(data).returning();
    return service;
  }

  async update(id: number, data: any) {
    const [service] = await this.db
      .update(services)
      .set(data)
      .where(eq(services.id, id))
      .returning();
    if (!service) throw new NotFoundException();
    return service;
  }

  async delete(id: number) {
    await this.db.delete(services).where(eq(services.id, id));
    return { success: true };
  }
}
