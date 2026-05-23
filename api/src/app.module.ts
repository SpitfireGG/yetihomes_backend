import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyInfoModule } from './company/about/about.module';
import { HouseModule } from './modules/marketplace/houses/houses.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LandModule } from './modules/marketplace/lands/lands.module';
import { ApartmentsModule } from './modules/marketplace/apartments/apartments.module';
import { NewsletterModule } from './company/newsletter/newsletter.module';
import { DocumentModule } from './company/documents/document.module';
import { InquiriesModule } from './company/enquiries/enquiries.module';
import { FaqModule } from './company/faqs/faq.module';
import { HttpLoggerMiddleware } from './utils/logger.middleware';
import { AffiliationsModule } from './company/affilations/affilation.module';
import { TeamModule } from './company/teams/team.module';
import { ReviewsModule } from './company/reviews/review.module';
import { BlogModule } from './company/blog/blog.module';
import { ContactModule } from './company/support/support.module';
import { SearchModule } from './modules/marketplace/search/search.module';
import { PropertiesModule } from './modules/marketplace/properties/properties.module';
import { AmenitiesModule } from './modules/marketplace/amenities/amenities.module';
import { SeoModule } from './modules/seo/seo.module';
import { StaticPageModule } from './company/static/static.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';
import { PrismaExceptionFilter } from './prisma/prisma.exception.filter';
import { FallbackController } from './common/fallback.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    PrismaModule,
    CompanyInfoModule,
    HouseModule,
    LandModule,
    ApartmentsModule,
    SearchModule,
    PropertiesModule,
    NewsletterModule,
    DocumentModule,
    InquiriesModule,
    FaqModule,
    TeamModule,
    ReviewsModule,
    BlogModule,
    AffiliationsModule,
    ContactModule,
    AuthModule,
    AmenitiesModule,
    SeoModule,
    StaticPageModule,
    AnalyticsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
  controllers: [AppController, FallbackController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
