import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from './entities/user.entity';
import { VerificationToken } from './entities/verification-token.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Assesment } from 'src/assesments/entities/assessment.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { MailingModule } from 'src/mailing/mailing.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MailingModule,
    TypeOrmModule.forFeature([
      User,
      Profile,
      VerificationToken,
      Appointment,
      Assesment,
      Payment
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService
  ],
  exports: [UserService] 
})
export class UserModule {}
