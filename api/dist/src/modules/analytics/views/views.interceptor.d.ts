import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ViewsService } from "./views.service";
import { PropertyType } from "@prisma/client";
export declare const TRACK_PROPERTY_TYPE = "track_property_type";
export declare const TrackPropertyView: (type: PropertyType) => import("@nestjs/common").CustomDecorator<string>;
export declare class PropertyViewInterceptor implements NestInterceptor {
    private readonly views;
    private readonly reflector;
    constructor(views: ViewsService, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
