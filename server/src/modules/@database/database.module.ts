import { Global, Module } from '@nestjs/common';
// import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//throw an error when any env variable is not found 

@Global()
    @Module({
      imports: [
      TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        // port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('DB_DATABASE'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
    // providers: [DatabaseService],
    // exports: [DatabaseService]
})
export class DatabaseModule {    }