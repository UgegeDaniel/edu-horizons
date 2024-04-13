import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './@database/database.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { QuizesModule } from './quizes/quizes.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, UsersModule, ResourcesModule, QuizesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

