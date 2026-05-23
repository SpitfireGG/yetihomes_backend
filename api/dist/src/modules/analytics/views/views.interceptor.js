"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyViewInterceptor = exports.TrackPropertyView = exports.TRACK_PROPERTY_TYPE = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const views_service_1 = require("./views.service");
exports.TRACK_PROPERTY_TYPE = "track_property_type";
const TrackPropertyView = (type) => (0, common_1.SetMetadata)(exports.TRACK_PROPERTY_TYPE, type);
exports.TrackPropertyView = TrackPropertyView;
let PropertyViewInterceptor = class PropertyViewInterceptor {
    views;
    reflector;
    constructor(views, reflector) {
        this.views = views;
        this.reflector = reflector;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (!req.params.id && !req.params.slug)
            return next.handle();
        return next.handle().pipe((0, rxjs_1.tap)((responseData) => {
            const propertyData = responseData?.data ?? responseData;
            if (!propertyData)
                return;
            const propertyId = propertyData.id;
            const propertyType = propertyData.propertyType;
            if (!propertyId || !propertyType)
                return;
            this.views.recordView(propertyType, propertyId, req).catch((err) => {
                console.error("view tracking failed:", err);
            });
        }));
    }
};
exports.PropertyViewInterceptor = PropertyViewInterceptor;
exports.PropertyViewInterceptor = PropertyViewInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [views_service_1.ViewsService,
        core_1.Reflector])
], PropertyViewInterceptor);
//# sourceMappingURL=views.interceptor.js.map