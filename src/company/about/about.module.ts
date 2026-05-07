import { Module } from '@nestjs/common';
import { CompanyInfoController } from './about.controller';
import { CompayInfoService } from './about.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompanyInfoController],
  providers: [CompayInfoService, PrismaService],
})
export class CompanyInfoModule {}
