import { Module } from "@nestjs/common";
import { ViewsService } from "./views.service";
import { ViewsController } from "./views.controller";
import { PropertyViewInterceptor } from "./views.interceptor";
import { FingerprintModule } from "../fingerprint/fingerprint.module";

@Module({
  imports: [FingerprintModule],
  controllers: [ViewsController],
  providers: [ViewsService, PropertyViewInterceptor],
  exports: [ViewsService, PropertyViewInterceptor],
})
export class ViewsModule {}