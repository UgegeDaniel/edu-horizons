import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly connection: DataSource) {}

  async onModuleInit() {
    if (this.connection.isInitialized) {
      console.log('Database connected successfully!');
      return;
    }
    try {
      await this.connection.initialize();
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Error connecting to database:', error.message);
    }
  }
}
