import { IsNotEmpty, IsString, IsArray, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
//   @Matches(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, {
//     message: 'Invalid Date format',
//   })
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
  @IsArray()
  attendeeIds: number[];

  @IsNotEmpty()
  @IsArray()
  host: number;
}
