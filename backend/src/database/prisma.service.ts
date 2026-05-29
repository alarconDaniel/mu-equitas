import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('databaseUrl'),
        },
      },
    });
  }

  onModuleInit() {
    void this.$connect()
      .then(() => {
        this.logger.log('Database connection established.');
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(`Database connection failed during startup: ${message}`);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}