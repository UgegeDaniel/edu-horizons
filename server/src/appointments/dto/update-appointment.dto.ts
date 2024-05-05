import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { AppointmentState } from '../utils/types';

//TODO: Consider changing User entity to type

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsDateString()
    appointment_time?: string;

    @IsString()
    meeting_link?: string;

    @IsString()
    duration?: string;

    @IsString()
    description?: string;

    @IsEnum(AppointmentState)
    state?: AppointmentState;

    @IsArray()
    attendees?: User[];
}
