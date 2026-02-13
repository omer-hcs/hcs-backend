import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      success: true,
      message: 'Hearing Care Service API is online',
      version: '1.0.0',
      docs: '/api/docs' // Placeholder if we add swagger later
    };
  }
}
