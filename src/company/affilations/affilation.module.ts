import { Module } from '@nestjs/common';
import { AffiliationsController } from './affilation.controller';
import { AffiliationsService } from './affilation.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AffiliationsController],
  providers: [AffiliationsService, PrismaService],
})
export class AffiliationsModule {}
