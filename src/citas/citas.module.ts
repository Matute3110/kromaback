import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [CitasController],
  providers: [CitasService, DatabaseService],
})
export class CitasModule {}
