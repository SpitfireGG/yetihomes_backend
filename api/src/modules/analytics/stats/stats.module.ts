import { Module } from "@nestjs/common";
import { StatsCronService } from "./stats-cron.service";

@Module({
  providers: [StatsCronService],
  exports: [StatsCronService],
})
export class StatsModule {}