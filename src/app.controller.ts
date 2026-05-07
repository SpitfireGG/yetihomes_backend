import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getApiHealth() {
    const data = {
      status: 'Up and Running ( healthy )',
      description: 'Api for yeti homes frontend',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
    return data;
  }
}
