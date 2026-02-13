import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  UseGuards, 
  ParseIntPipe 
} from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('about-page-content')
export class AboutPageContentController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  find() { return this.aboutPageService.findContent(); }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: any) { return this.aboutPageService.createContent(data); }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) { 
    return this.aboutPageService.updateContent(id, data); 
  }
}

@Controller('about-timeline')
export class AboutTimelineController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  find() { return this.aboutPageService.findTimeline(); }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: any) { return this.aboutPageService.createMilestone(data); }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.aboutPageService.updateMilestone(id, data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aboutPageService.deleteMilestone(id);
  }
}
