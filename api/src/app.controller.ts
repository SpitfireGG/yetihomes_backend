import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApiHealth() {
    return {
      status: 'up',
      description: 'Yeti Homes API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
