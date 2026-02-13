import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { eq, desc, sql } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import { leads } from '../../db/schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';
import { EmailService } from '../../utils/email.service';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constants';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateLeadDto) {
    const [lead] = await this.db.insert(leads).values(dto).returning();

    // Send emails asynchronously — do not await to keep response fast
    this.emailService.sendAdminNotification(lead).catch((err) => {
      this.logger.error(`Admin email failed: ${err.message}`);
    });

    this.emailService.sendUserConfirmation(lead).catch((err) => {
      this.logger.error(`User confirmation email failed: ${err.message}`);
    });

    return lead;
  }

  async findAll(page?: number, pageSize?: number) {
    const currentPage = Math.max(1, page || DEFAULT_PAGE);
    const limit = Math.min(pageSize || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const offset = (currentPage - 1) * limit;

    const [data, countResult] = await Promise.all([
      this.db
        .select()
        .from(leads)
        .orderBy(desc(leads.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ count: sql<number>`count(*)` }).from(leads),
    ]);

    const total = Number(countResult[0].count);

    return {
      data,
      meta: {
        page: currentPage,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto) {
    const [updated] = await this.db
      .update(leads)
      .set({ status: dto.status })
      .where(eq(leads.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Lead with id "${id}" not found`);
    }

    return updated;
  }
}
