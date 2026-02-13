import { Module } from '@nestjs/common';
import { AboutPageContentController, AboutTimelineController } from './about-page.controller';
import { AboutPageService } from './about-page.service';

@Module({
  controllers: [AboutPageContentController, AboutTimelineController],
  providers: [AboutPageService]
})
export class AboutPageModule {}
