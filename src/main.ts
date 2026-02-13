import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ─── Global Prefix ────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── Security ─────────────────────────────────────────────────
  app.use(helmet());

  const corsOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-better-auth-state'],
    exposedHeaders: ['Set-Cookie'],
  });

  // ─── Rate Limiting (global) ───────────────────────────────────
  const rateLimit = await import('express-rate-limit');
  const limiter = rateLimit.default({
    windowMs: configService.get<number>('app.rateLimit.ttl') || 60000,
    max: configService.get<number>('app.rateLimit.max') || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  });
  app.use(limiter);

  // ─── Leads-specific rate limit ────────────────────────────────
  const leadsLimiter = rateLimit.default({
    windowMs: configService.get<number>('app.leadsRateLimit.ttl') || 60000,
    max: configService.get<number>('app.leadsRateLimit.max') || 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many lead submissions, please try again later.' },
  });
  app.use('/api/leads', leadsLimiter);

  // ─── Global Pipes & Filters ───────────────────────────────────
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // ─── Start ────────────────────────────────────────────────────
  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port);
  console.log(`🚀 Hearing Care Service API running on: http://localhost:${port}/api`);
}

bootstrap();
