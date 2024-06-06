import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { AssignedLevels } from 'src/utils/types';
import { TopicService } from 'src/topic/topic.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    private readonly topicService: TopicService,
  ) {}

  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    const topicsPromises = createResourceDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromises);
    const resource = this.resourceRepository.create({
      ...createResourceDto,
      topics,
    });
    return this.resourceRepository.save(resource);
  }

  async getResourceById(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    return resource;
  }

  async findAllResource() {
    const resource = await this.resourceRepository.find();
    return resource;
  }

  async getResourceByIntendedLevel(
    intendedLevel: AssignedLevels,
  ): Promise<Resource[]> {
    return this.resourceRepository.find({
      where: { intended_level: intendedLevel },
    });
  }

  async getResourceByTopic(topicId: number): Promise<Resource[]> {
    return this.resourceRepository
      .createQueryBuilder('resource')
      .innerJoinAndSelect('resource.topics', 'topic', 'topic.id = :topicId', {
        topicId,
      })
      .getMany();
  }

  async updateResourceDetails(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    const topicsPromises = updateResourceDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromises);
    const resource = await this.getResourceById(id);
    this.resourceRepository.merge(resource, { ...updateResourceDto, topics });
    return this.resourceRepository.save(resource);
  }

  async deleteResource(id: number): Promise<void> {
    const resource = await this.getResourceById(id);
    await this.resourceRepository.remove(resource);
  }
}
