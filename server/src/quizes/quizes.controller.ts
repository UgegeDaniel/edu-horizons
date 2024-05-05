import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizes')
export class QuizesController {
  constructor(private readonly quizesService: QuizesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizesService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizeDto: UpdateQuizDto) {
    return this.quizesService.update(+id, updateQuizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizesService.remove(+id);
  }
}
