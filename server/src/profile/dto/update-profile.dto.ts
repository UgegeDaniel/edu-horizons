import {
  IsOptional,
  IsString,
  IsArray,
  IsPhoneNumber,
  IsJSON,
} from 'class-validator';
import { AssignedLevels, Days } from 'src/utils/types';

export class UpdateProfileDTO {
  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsJSON()
  address?: {
    houseNumber: string;
    street: string;
    city: string;
    country: string;
  };

  @IsOptional()
  @IsJSON()
  edu_bg?: {
    curr_institution: string;
    curr_program: string;
    upcoming_cert: string;
    year: string;
  };

  @IsOptional()
  assigned_level?: AssignedLevels;

  @IsOptional()
  @IsArray()
  interests?: string[];

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  preferred_meeting_days?: Days[];
}