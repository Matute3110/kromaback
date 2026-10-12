import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [ServicesController],
  providers: [ServicesService,DatabaseService],
})
export class ServicesModule {}
