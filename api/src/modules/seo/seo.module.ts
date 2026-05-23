import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SeoController } from './controllers/seo.controller';
import { SeoService } from './services/seo.service';
import { SlugService } from './services/slug.service';
import { RedirectMiddleware } from './middleware/redirect.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeoController],
  providers: [SeoService, SlugService, RedirectMiddleware],
  exports: [SeoService, SlugService],
})
export class SeoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes('*');
  }
}