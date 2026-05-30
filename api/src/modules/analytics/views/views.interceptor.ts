import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, tap } from "rxjs";
import { ViewsService } from "./views.service";
import { PropertyType } from "@prisma/client";

export const TRACK_PROPERTY_TYPE = "track_property_type";

export const TrackPropertyView = (type: PropertyType) =>
  SetMetadata(TRACK_PROPERTY_TYPE, type);

@Injectable()
export class PropertyViewInterceptor implements NestInterceptor {
  constructor(
    private readonly views: ViewsService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (!req.params.id && !req.params.slug) return next.handle();

    return next.handle().pipe(
      tap((responseData: any) => {
        const propertyData = responseData?.data ?? responseData;
        if (!propertyData) return;

        const propertyId = propertyData.id;
        const propertyType = propertyData.propertyType;
        if (!propertyId || !propertyType) return;

        this.views.recordView(propertyType, propertyId, req).catch(() => {});
      }),
    );
  }
}