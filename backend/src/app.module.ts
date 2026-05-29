import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/env.validation';
import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { ContactModule } from './contact/contact.module';
import { DatabaseModule } from './database/prisma.module';
import { DollsModule } from './dolls/dolls.module';
import { HealthModule } from './health/health.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    DatabaseModule,
    HealthModule,
    DollsModule,
    CategoriesModule,
    CollectionsModule,
    NewsletterModule,
    ContactModule,
  ],
})
export class AppModule {}
