import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { FingerprintService } from "./fingerprint.service";
import { VisitorCookieMiddleware } from "./visitor-cookie.middleware";

@Module({
  providers: [FingerprintService, VisitorCookieMiddleware],
  exports: [FingerprintService, VisitorCookieMiddleware],
})
export class FingerprintModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VisitorCookieMiddleware).forRoutes("*");
  }
}