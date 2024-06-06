import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { Resource } from './entities/resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from 'src/topic/topic.service';
import { Topic } from 'src/topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Topic])],
  controllers: [ResourceController],
  providers: [ResourceService, TopicService],
})
export class ResourceModule {}
