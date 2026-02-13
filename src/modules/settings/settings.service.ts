import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import { clinicSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SettingsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll() {
    return this.db.select().from(clinicSettings);
  }

  async getClinicInfo() {
    const [settings] = await this.db.select({
      id: clinicSettings.id,
      phone: clinicSettings.phone,
      email: clinicSettings.email,
      address: clinicSettings.address,
    }).from(clinicSettings).limit(1);

    return settings || null;
  }

  async getHours() {
    const [settings] = await this.db.select({
      id: clinicSettings.id,
      weekdayHours: clinicSettings.weekdayHours,
      saturdayHours: clinicSettings.saturdayHours,
      sundayHours: clinicSettings.sundayHours,
      operatingHours: clinicSettings.operatingHours,
    }).from(clinicSettings).limit(1);

    return settings || null;
  }

  async create(data: any) {
    const [record] = await this.db
      .insert(clinicSettings)
      .values(data)
      .returning();
    return record;
  }

  async update(id: number, data: any) {
    console.log('SettingsService.update received:', { id, data });
    const [record] = await this.db
      .update(clinicSettings)
      .set(data)
      .where(eq(clinicSettings.id, id))
      .returning();
    console.log('SettingsService.update saved:', record);
    return record;
  }
}
