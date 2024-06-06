import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from './entities/user.entity';
import { VerificationToken } from './entities/verification-token.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { MailingModule } from 'src/mailing/mailing.module';
import { JwtService } from '@nestjs/jwt';
import { UserCommand } from './user.command';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [
    AuthModule,
    MailingModule,
    AbilityModule,
    TypeOrmModule.forFeature([
      User,
      Profile,
      VerificationToken,
      Appointment,
      Assessment,
      Payment,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, UserCommand],
  exports: [UserService],
})
export class UserModule {}
