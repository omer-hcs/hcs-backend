import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { envConfig } from './config/env.config';
import { DbModule } from './db/db.module';
import { LeadsModule } from './modules/leads/leads.module';
import { ProductsModule } from './modules/products/products.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import { ServicesModule } from './modules/services/services.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomepageContentModule } from './modules/homepage-content/homepage-content.module';
import { AboutPageModule } from './modules/about-page/about-page.module';
import { UploadModule } from './modules/upload/upload.module';
import { AppController } from './app.controller';
import { SanitizeMiddleware } from './common/middleware/sanitize.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    DbModule,
    LeadsModule,
    ProductsModule,
    ArticlesModule,
    FaqsModule,
    ServicesModule,
    SettingsModule,
    AuthModule,
    HomepageContentModule,
    AboutPageModule,
    UploadModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SanitizeMiddleware).forRoutes('*');
  }
}
