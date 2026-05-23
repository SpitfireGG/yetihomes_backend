import { Module } from '@nestjs/common';
import { StaticPageController } from './static.controller';
import { StaticPageService } from './static.service';

@Module({
  controllers: [StaticPageController],
  providers: [StaticPageService],
  exports: [StaticPageService],
})
export class StaticPageModule {}