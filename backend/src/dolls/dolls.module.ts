import { Module } from '@nestjs/common';
import { DollsController } from './dolls.controller';
import { DollsService } from './dolls.service';

@Module({
  controllers: [DollsController],
  providers: [DollsService],
  exports: [DollsService],
})
export class DollsModule {}
