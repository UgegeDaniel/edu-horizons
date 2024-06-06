import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailingModule } from './mailing/mailing.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { ResourceModule } from './resource/resource.module';
import { TopicModule } from './topic/topic.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { QuizModule } from './quizes/quiz.module';
import { CommandModule } from 'nestjs-command';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppointmentsModule,
    AuthModule,
    MailingModule,
    PaymentModule,
    ProfileModule,
    QuizModule,
    ResourceModule,
    TopicModule,
    UserModule,
    DatabaseModule,
    CommandModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
