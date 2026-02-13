import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { EmailService } from '../../utils/email.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, EmailService],
})
export class LeadsModule {}
