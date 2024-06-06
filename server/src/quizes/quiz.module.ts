import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Topic } from 'src/topic/entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { TopicService } from 'src/topic/topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Topic])],
  controllers: [QuizController],
  providers: [QuizService, TopicService],
})
export class QuizModule {}
