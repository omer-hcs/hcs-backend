import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../../db/drizzle';
import { articles } from '../../db/schema';

@Injectable()
export class ArticlesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll(includeUnpublished = false) {
    let query = this.db.select().from(articles).orderBy(desc(articles.publishedDate));
    if (!includeUnpublished) {
      // @ts-ignore - drizzle type complexity
      query = query.where(eq(articles.isPublished, true));
    }
    return query;
  }

  async findById(id: number) {
    const [article] = await this.db.select().from(articles).where(eq(articles.id, id));
    if (!article) throw new NotFoundException(`Article with ID "${id}" not found`);
    return article;
  }

  async findBySlug(slug: string) {
    const [article] = await this.db.select().from(articles).where(eq(articles.slug, slug));
    if (!article) throw new NotFoundException(`Article with slug "${slug}" not found`);
    return article;
  }

  async create(data: any) {
    const [article] = await this.db.insert(articles).values(data).returning();
    return article;
  }

  async update(id: number, data: any) {
    const [article] = await this.db
      .update(articles)
      .set(data)
      .where(eq(articles.id, id))
      .returning();
    if (!article) throw new NotFoundException();
    return article;
  }

  async delete(id: number) {
    await this.db.delete(articles).where(eq(articles.id, id));
    return { success: true };
  }
}
