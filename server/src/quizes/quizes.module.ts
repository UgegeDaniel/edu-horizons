import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizesController } from './quizes.controller';

@Module({
  controllers: [QuizesController],
  providers: [QuizesService],
})
export class QuizesModule {}
