import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { myDataSource } from './datasource';

//convert to try/catch

@Injectable()
export class DatabaseService implements OnModuleInit {
  onModuleInit() {
    this.createDbConnection();
  }
  private AppDataSource = new DataSource(myDataSource);
    
    createRepository<T>(entity: EntityTarget<T>) {
        return this.AppDataSource.manager.getRepository(entity)
    }

    createDbConnection() {
        try {
            this.AppDataSource.initialize()
            console.log('Data Source has been initialized!');
        }
        catch (err) {
            
            console.error('Error during Data Source initialization', err);
        }
  }
}