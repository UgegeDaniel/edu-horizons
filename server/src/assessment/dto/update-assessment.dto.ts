import { PartialType } from '@nestjs/mapped-types';
import { AssignAssesmentDto } from './assign-assessment.dto';
import { IsNumber, IsEnum, IsDate, IsArray } from 'class-validator';
import { AssesmentType, SubmissionStatus } from '../utils/types';
import { User } from 'src/user/entities/user.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Topic } from 'src/topic/entities/topic.entity';

//TODO: Consider changing User, Topic and Quiz entity to type

export class UpdateAssesmentDto extends PartialType(AssignAssesmentDto) {
    @IsNumber()
    assigned_by?: User;

    @IsNumber()
    assigned_to?: number[];

    @IsEnum(AssesmentType)
    assessment_type?: AssesmentType;

    @IsEnum(SubmissionStatus)
    status?: SubmissionStatus;

    @IsDate()
    submission_date?: Date;

    @IsDate()
    due_date?: Date;

    @IsNumber()
    score?: number;

    @IsNumber()
    number_of_questions?: number;

    @IsNumber()
    alloted_time?: number;

    @IsArray()
    topics?: number[];

    @IsArray()
    questions?: number[];
}
