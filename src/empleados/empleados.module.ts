import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService, DatabaseService],
})
export class EmpleadosModule {}
