import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupApp } from './setup';
import express from 'express';
import { INestApplication } from '@nestjs/common';

const expressApp = express();

// Force Vercel to include better-auth dependencies (bypassing eval obfuscation)
try {
  if (false) {
    require('better-auth');
    require('better-auth/adapters/drizzle');
    require('better-auth/node');
  }
} catch (e) {}

const createNestServer = async (expressInstance: express.Express): Promise<INestApplication> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  await setupApp(app);
  await app.init();
  return app;
};

// Cache the Nest app instance locally to optimize cold starts
let nestAppPromise: Promise<INestApplication>;

export default async function handler(req: any, res: any) {
  if (!nestAppPromise) {
    nestAppPromise = createNestServer(expressApp);
  }
  
  await nestAppPromise;
  expressApp(req, res);
}
