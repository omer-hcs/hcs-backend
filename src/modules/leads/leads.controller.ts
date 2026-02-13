import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { createLeadSchema } from './dto/create-lead.dto';
import { updateLeadStatusSchema } from './dto/update-lead-status.dto';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown) {
    const dto = createLeadSchema.parse(body);
    return this.leadsService.create(dto);
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.leadsService.findAll(
      page ? parseInt(page, 10) : undefined,
      pageSize ? parseInt(pageSize, 10) : undefined,
    );
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() body: unknown,
  ) {
    const dto = updateLeadStatusSchema.parse(body);
    return this.leadsService.updateStatus(id, dto);
  }
}
