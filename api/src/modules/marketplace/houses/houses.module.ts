import { Module } from '@nestjs/common';
import { HouseController } from './houses.controller';
import { HouseService } from './houses.service';
@Module({
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
