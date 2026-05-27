import { Module } from '@nestjs/common';
import { CompanyInfoController } from './about.controller';
import { CompayInfoService } from './about.service';
@Module({
  controllers: [CompanyInfoController],
  providers: [CompayInfoService],
})
export class CompanyInfoModule {}
