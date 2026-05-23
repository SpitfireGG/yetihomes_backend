import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StatsCronService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDaily() {
    await this.prisma.propertyViewStats.updateMany({
      data: { viewsToday: 0 },
    });
  }

  @Cron("0 0 * * 1")
  async resetWeekly() {
    await this.prisma.propertyViewStats.updateMany({
      data: { viewsThisWeek: 0 },
    });
  }

  @Cron("0 0 1 * *")
  async resetMonthly() {
    await this.prisma.propertyViewStats.updateMany({
      data: { viewsThisMonth: 0 },
    });
  }
}