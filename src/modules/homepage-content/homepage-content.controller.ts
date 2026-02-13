import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body, 
  UseGuards, 
  ParseIntPipe 
} from '@nestjs/common';
import { HomepageContentService } from './homepage-content.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('homepage-content')
export class HomepageContentController {
  constructor(private readonly homepageContentService: HomepageContentService) {}

  @Get()
  findOne() {
    return this.homepageContentService.findOne();
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: any) {
    return this.homepageContentService.create(data);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.homepageContentService.update(id, data);
  }
}
