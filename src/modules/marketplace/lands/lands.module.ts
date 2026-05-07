import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LandController } from './lands.controller';
import { LandService } from './lands.service';

@Module({
  controllers: [LandController],
  providers: [LandService, PrismaService],
})
export class LandModule {}
