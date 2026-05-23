"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const about_module_1 = require("./company/about/about.module");
const houses_module_1 = require("./modules/marketplace/houses/houses.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const lands_module_1 = require("./modules/marketplace/lands/lands.module");
const apartments_module_1 = require("./modules/marketplace/apartments/apartments.module");
const newsletter_module_1 = require("./company/newsletter/newsletter.module");
const document_module_1 = require("./company/documents/document.module");
const enquiries_module_1 = require("./company/enquiries/enquiries.module");
const faq_module_1 = require("./company/faqs/faq.module");
const logger_middleware_1 = require("./utils/logger.middleware");
const affilation_module_1 = require("./company/affilations/affilation.module");
const team_module_1 = require("./company/teams/team.module");
const review_module_1 = require("./company/reviews/review.module");
const blog_module_1 = require("./company/blog/blog.module");
const support_module_1 = require("./company/support/support.module");
const search_module_1 = require("./modules/marketplace/search/search.module");
const properties_module_1 = require("./modules/marketplace/properties/properties.module");
const amenities_module_1 = require("./modules/marketplace/amenities/amenities.module");
const seo_module_1 = require("./modules/seo/seo.module");
const static_module_1 = require("./company/static/static.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./modules/auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./modules/auth/jwt.auth.guard");
const prisma_exception_filter_1 = require("./prisma/prisma.exception.filter");
const fallback_controller_1 = require("./common/fallback.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.HttpLoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true, cache: true }),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
            prisma_module_1.PrismaModule,
            about_module_1.CompanyInfoModule,
            houses_module_1.HouseModule,
            lands_module_1.LandModule,
            apartments_module_1.ApartmentsModule,
            search_module_1.SearchModule,
            properties_module_1.PropertiesModule,
            newsletter_module_1.NewsletterModule,
            document_module_1.DocumentModule,
            enquiries_module_1.InquiriesModule,
            faq_module_1.FaqModule,
            team_module_1.TeamModule,
            review_module_1.ReviewsModule,
            blog_module_1.BlogModule,
            affilation_module_1.AffiliationsModule,
            support_module_1.ContactModule,
            auth_module_1.AuthModule,
            amenities_module_1.AmenitiesModule,
            seo_module_1.SeoModule,
            static_module_1.StaticPageModule,
            analytics_module_1.AnalyticsModule,
        ],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_exception_filter_1.PrismaExceptionFilter,
            },
        ],
        controllers: [app_controller_1.AppController, fallback_controller_1.FallbackController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map