import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule, QuizesModule, ResourcesModule, UsersModule } from './modules';
import { DatabaseModule } from './modules/@database/database.module';


@Module({
  imports: [DatabaseModule, UsersModule, ResourcesModule, QuizesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

