import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Assesment } from 'src/assesments/entities/assessment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Topic, Assesment])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
