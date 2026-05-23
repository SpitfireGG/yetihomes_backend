import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService, PrismaService],
})
export class ApartmentsModule {}
