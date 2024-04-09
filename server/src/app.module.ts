import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule, QuizesModule, ResourcesModule, UsersModule } from './modules';
import { DatabaseModule } from './modules/@database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, UsersModule, ResourcesModule, QuizesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

