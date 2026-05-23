"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./utils/transform.interceptor");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("@nestjs/config");
const views_interceptor_1 = require("./modules/analytics/views/views.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    const corsOrigins = configService.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001');
    const origins = corsOrigins.split(',').map((o) => o.trim()).filter(Boolean);
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
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map