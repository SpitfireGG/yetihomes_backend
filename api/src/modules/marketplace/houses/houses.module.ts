import { Module } from '@nestjs/common';
import { HouseController } from './houses.controller';
import { HouseService } from './houses.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HouseController],
  providers: [HouseService, PrismaService],
})
export class HouseModule {}
