"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./utils/transform.interceptor");
const config_1 = require("@nestjs/config");
const views_interceptor_1 = require("./modules/analytics/views/views.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const corsOrigins = configService.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001');
    const origins = corsOrigins
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
    app.enableCors({
        origin: origins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalInterceptors(app.get(views_interceptor_1.PropertyViewInterceptor));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const port = process.env.PORT ?? 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`YetiHomes API running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map