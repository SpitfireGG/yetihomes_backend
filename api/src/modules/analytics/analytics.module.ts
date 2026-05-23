import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { FingerprintModule } from "./fingerprint/fingerprint.module";
import { ViewsModule } from "./views/views.module";
import { StatsModule } from "./stats/stats.module";

@Module({
  imports: [PrismaModule, FingerprintModule, ViewsModule, StatsModule],
  exports: [ViewsModule, FingerprintModule, StatsModule],
})
export class AnalyticsModule {}