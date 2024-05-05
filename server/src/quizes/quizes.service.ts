import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizesService {
  create(createQuizeDto: CreateQuizDto) {
    return 'This action adds a new quize';
  }

  findAll() {
    return `This action returns all quizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quize`;
  }

  update(id: number, updateQuizeDto: UpdateQuizDto) {
    return `This action updates a #${id} quize`;
  }

  remove(id: number) {
    return `This action removes a #${id} quize`;
  }
}
