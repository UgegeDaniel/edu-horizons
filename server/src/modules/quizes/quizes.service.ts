import { Injectable } from '@nestjs/common';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { UpdateQuizeDto } from './dto/update-quize.dto';

@Injectable()
export class QuizesService {
  create(createQuizeDto: CreateQuizeDto) {
    return 'This action adds a new quize';
  }

  findAll() {
    return `This action returns all quizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quize`;
  }

  update(id: number, updateQuizeDto: UpdateQuizeDto) {
    return `This action updates a #${id} quize`;
  }

  remove(id: number) {
    return `This action removes a #${id} quize`;
  }
}
