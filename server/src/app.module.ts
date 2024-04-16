import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { QuizesModule } from './quizes/quizes.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AssesmentsModule } from './assesments/assesments.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { ResourceModule } from './resource/resource.module';
import { TopicModule } from './topic/topic.module';
import { MailingModule } from './mailing/mailing.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    ResourcesModule,
    QuizesModule,
    AppointmentsModule,
    AssesmentsModule,
    PaymentModule,
    ProfileModule,
    ResourceModule,
    TopicModule,
    MailingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
