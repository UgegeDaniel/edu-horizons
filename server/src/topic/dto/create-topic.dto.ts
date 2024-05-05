import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { AssignedLevels } from 'src/utils/types';

export class CreateTopicDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    intended_level: AssignedLevels;

    @IsNotEmpty()
    @IsString()
    subject: string;
}
