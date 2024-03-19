import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizeDto } from './create-quize.dto';

export class UpdateQuizeDto extends PartialType(CreateQuizeDto) {}
