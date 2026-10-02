import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [ ],
  controllers: [UsersController],
  providers: [DatabaseService,UsersService],
})
export class UsersModule {}
