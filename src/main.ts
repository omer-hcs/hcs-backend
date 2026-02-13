import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await setupApp(app);

  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port);
  console.log(`🚀 Hearing Care Service API running on: http://localhost:${port}/api`);
}

bootstrap();
