import { Controller, Get, Post, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  @Get('clinic-info')
  async getClinicInfo() {
    return this.settingsService.getClinicInfo();
  }

  @Get('hours')
  async getHours() {
    return this.settingsService.getHours();
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.settingsService.update(id, data);
  }

  @Patch()
  @UseGuards(AdminGuard)
  async updateSingleton(@Body() data: any) {
    const settings = await this.settingsService.findAll();
    if (settings.length > 0) {
      return this.settingsService.update(settings[0].id, data);
    }
    return this.settingsService.create(data);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() data: any) {
    return this.settingsService.create(data);
  }
}
