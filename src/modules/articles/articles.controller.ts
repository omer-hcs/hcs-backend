import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  Query, 
  UseGuards, 
  ParseIntPipe 
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query('includeUnpublished') includeUnpublished?: string) {
    return this.articlesService.findAll(includeUnpublished === 'true');
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() data: any) {
    return this.articlesService.create(data);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.articlesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.delete(id);
  }
}
