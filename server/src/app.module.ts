import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ResourcesModule } from './resources/resources.module';
import { QuizesModule } from './quizes/quizes.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [UsersModule, ResourcesModule, QuizesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

