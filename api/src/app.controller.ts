import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/auth/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getApiHealth() {
    return {
      status: 'up',
      description: 'Yeti Homes API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
