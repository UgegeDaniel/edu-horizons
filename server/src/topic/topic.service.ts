import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { AssignedLevels } from 'src/utils/types';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create();
    const topicDetails = Object.assign(topic, createTopicDto);
    return this.topicRepository.save(topicDetails);
  }

  findAll() {
    return `This action returns all topic`;
  }

  async findById(topicId: number) {
    return this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });
  }
  async findByIntendedLevel(intendedLevel: AssignedLevels) {
    return this.topicRepository.findOne({
      where: {
        intended_level: intendedLevel,
      },
    });
  }
  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const quiz = await this.findById(id);
    this.topicRepository.merge(quiz, updateTopicDto);
    return this.topicRepository.save(quiz);
  }
  async remove(id: number): Promise<void> {
    const quiz = await this.findById(id);
    await this.topicRepository.remove(quiz);
  }
}
