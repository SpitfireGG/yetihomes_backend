import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { PropertyViewInterceptor } from './modules/analytics/views/views.interceptor';
import * as http from 'http';

async function bootstrap() {
  // Create a raw HTTP health server on an alternate port to test Render connectivity
  const healthPort = parseInt(process.env.HEALTH_PORT ?? '10001', 10);
  const healthServer = http.createServer((req, res) => {
    console.log(`[HealthServer] ${req.method} ${req.url} - received`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', port: healthPort }));
  });
  healthServer.listen(healthPort, '0.0.0.0', () => {
    console.log(`[HealthServer] Listening on 0.0.0.0:${healthPort}`);
  });

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.use(helmet());

  const corsOrigins = configService.get<string>('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001');
  const origins = corsOrigins.split(',').map((o: string) => o.trim()).filter(Boolean);

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalInterceptors(app.get(PropertyViewInterceptor));
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '4000', 10);
  console.log(`[YetiHomes API] Starting on PORT=${port}, NODE_ENV=${process.env.NODE_ENV}`);
  await app.listen(port, '0.0.0.0');
  console.log(`[YetiHomes API] NestJS listening on 0.0.0.0:${port}`);
  console.log(`[YetiHomes API] Health server on 0.0.0.0:${healthPort}`);
  console.log(`[YetiHomes API] RENDER_EXTERNAL_URL=${process.env.RENDER_EXTERNAL_URL || 'not set'}`);
  console.log(`[YetiHomes API] All env vars: PORT=${process.env.PORT}, HEALTH_PORT=${process.env.HEALTH_PORT}, NODE_ENV=${process.env.NODE_ENV}`);
}
bootstrap();
