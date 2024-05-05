import { IsNotEmpty, IsString, IsArray, IsDateString, IsEnum } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { AppointmentState } from '../utils/types';

//TODO: Consider changing User entity to type

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    appointment_time: string;

    @IsNotEmpty()
    @IsString()
    meeting_link: string;

    @IsNotEmpty()
    @IsString()
    duration: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(AppointmentState)
    state: AppointmentState;

    @IsNotEmpty()
    @IsArray()
    attendees: User[];
}
