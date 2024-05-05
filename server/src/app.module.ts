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
import { QuizesModule } from './quizes/quizes.module';

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
    QuizesModule,
    ResourceModule,
    TopicModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
