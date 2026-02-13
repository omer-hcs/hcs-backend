import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as rateLimit from 'express-rate-limit'; // Changed to namespace import for compatibility

export async function setupApp(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);

  // ─── Global Prefix ────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── Security ─────────────────────────────────────────────────
  app.use(helmet());

  const corsOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://hcs-frontend.vercel.app', 
    'https://hcs-backend.vercel.app',
    // Add other production domains here
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false); // Block unknown origins in production if desired, or allow all for public APIs
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-better-auth-state'],
    exposedHeaders: ['Set-Cookie'],
  });

  // ─── Rate Limiting (global) ───────────────────────────────────
  // Note: Vercel has its own rate limiting at the edge, but this adds application-level protection
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
}
