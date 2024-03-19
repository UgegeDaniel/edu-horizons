import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule, QuizesModule, ResourcesModule, UsersModule } from './modules';


@Module({
  imports: [UsersModule, ResourcesModule, QuizesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

