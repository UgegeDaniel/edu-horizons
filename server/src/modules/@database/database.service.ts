import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

//convert to try/catch

@Injectable()
export class DatabaseService implements OnModuleInit {
  onModuleInit() {
    this.createDbConnection();
  }
  private AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST!,
    port: 3306,
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABSE!,
  });

  createDbConnection() {
    this.AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }
}
