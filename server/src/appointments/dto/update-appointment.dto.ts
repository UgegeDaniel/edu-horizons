import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsArray, IsDateString, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

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

    @IsArray()
    attendees?: User[];
}
