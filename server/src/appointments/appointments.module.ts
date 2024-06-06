import { Module } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { VerificationToken } from 'src/user/entities/verification-token.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { AppointmentCommand } from './appointment.command';
import { AbilityFactory } from 'src/ability/ability.factory/ability.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, VerificationToken, Profile]),
  ],
  controllers: [AppointmentsController],
  providers: [AbilityFactory, AppointmentService, UserService, JwtService, AppointmentCommand],
})
export class AppointmentsModule {}
