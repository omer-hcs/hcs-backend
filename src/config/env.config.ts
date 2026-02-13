import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  database: {
    url: process.env.DATABASE_URL,
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@clinic.com',
  },
  clinicName: process.env.CLINIC_NAME || 'Hearing Care Clinic',
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
  leadsRateLimit: {
    ttl: parseInt(process.env.LEADS_RATE_LIMIT_TTL || '60000', 10),
    max: parseInt(process.env.LEADS_RATE_LIMIT_MAX || '5', 10),
  },
  auth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  }
}));
