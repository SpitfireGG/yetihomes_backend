import { Controller, Get, Param, Query } from "@nestjs/common";
import { PropertyType } from "@prisma/client";
import { ViewsService } from "./views.service";
import { Public } from "src/modules/auth/public.decorator";

@Controller("analytics/views")
export class ViewsController {
  constructor(private readonly views: ViewsService) {}

  @Public()
  @Get(":type/:id")
  async getOne(
    @Param("type") type: PropertyType,
    @Param("id") id: string,
  ) {
    const stats = await this.views.getStats(type, id);
    return stats ?? { totalViews: 0, uniqueViews: 0, viewsToday: 0, viewsThisWeek: 0, viewsThisMonth: 0 };
  }

  @Get("bulk/:type")
  async getBulk(
    @Param("type") type: PropertyType,
    @Query("ids") idsCsv: string,
  ) {
    const ids = idsCsv?.split(",").filter(Boolean) ?? [];
    return this.views.getBulkStats(type, ids);
  }

  @Get("top")
  async top(
    @Query("type") type?: PropertyType,
    @Query("limit") limit?: string,
  ) {
    return this.views.getTopProperties(type, limit ? parseInt(limit) : 10);
  }
}