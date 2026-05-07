import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
import { EmailModule } from './utils/email/email.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
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
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
