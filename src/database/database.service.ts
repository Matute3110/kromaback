import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import {config} from 'dotenv';
config();


@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  constructor() {
    this.connect();
  }
  private async connect() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async query<T>(sql: string, args: any[]): Promise<T> {
    if (!this.connection || this.connection['state'] !== 'connected') {
      await this.connect();
    
    }
    const [ rows ] = await this.connection.query(sql, args);

    return rows as T;
  }
}
