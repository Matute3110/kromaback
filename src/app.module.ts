import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { SchedulesModule } from './schedules/schedules.module';
import { PaymentsModule } from './payments/payments.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [
    UsersModule,
    SchedulesModule,
    PaymentsModule,
    ServicesModule,
    AuthModule,
    EmpleadosModule,
    CitasModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
