import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { PropertyViewInterceptor } from './modules/analytics/views/views.interceptor';

async function bootstrap() {
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
  const port = process.env.PORT ?? 4000;
  console.log(`[YetiHomes API] Starting on PORT=${port}, NODE_ENV=${process.env.NODE_ENV}`);
  await app.listen(port, '0.0.0.0');
  console.log(`[YetiHomes API] Listening on 0.0.0.0:${port}`);
}
bootstrap();
