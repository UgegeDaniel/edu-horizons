import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { UpdateQuizeDto } from './dto/update-quize.dto';

@Controller('quizes')
export class QuizesController {
  constructor(private readonly quizesService: QuizesService) {}

  @Post()
  create(@Body() createQuizeDto: CreateQuizeDto) {
    return this.quizesService.create(createQuizeDto);
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
  update(@Param('id') id: string, @Body() updateQuizeDto: UpdateQuizeDto) {
    return this.quizesService.update(+id, updateQuizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizesService.remove(+id);
  }
}
