import { IsNotEmpty, IsString, IsEnum, IsNumber, IsArray, IsDate } from 'class-validator';
import { AssesmentType, SubmissionStatus } from '../utils/types';
import { User } from 'src/user/entities/user.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Topic } from 'src/topic/entities/topic.entity';

//TODO: Consider changing User, Topic and Quiz entity to type

export class CreateAssesmentDto {
    @IsNotEmpty()
    @IsNumber()
    assigned_by: User;

    @IsNotEmpty()
    @IsNumber()
    assigned_to: User;

    @IsNotEmpty()
    @IsEnum(AssesmentType)
    assessment_type: AssesmentType;

    @IsNotEmpty()
    @IsEnum(SubmissionStatus)
    status: SubmissionStatus;

    @IsNotEmpty()
    @IsDate()
    submission_date: Date;

    @IsNotEmpty()
    @IsDate()
    due_date: Date;

    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @IsNumber()
    number_of_questions: number;

    @IsNotEmpty()
    @IsNumber()
    alloted_time: number;

    @IsNotEmpty()
    @IsArray()
    topics: Topic[];

    @IsNotEmpty()
    @IsArray()
    questions: Quiz[];
}

