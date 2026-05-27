import { Module } from '@nestjs/common';
import { LandController } from './lands.controller';
import { LandService } from './lands.service';

@Module({
  controllers: [LandController],
  providers: [LandService],
})
export class LandModule {}
