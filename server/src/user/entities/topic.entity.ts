import { Column, Entity } from 'typeorm';
import { AssignedLevels } from './types';
import { AbstractEntity } from './abstract-entity.entity';

@Entity('topic')
export class Topic extends AbstractEntity {
  @Column()
  title: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AssignedLevels,
    default: AssignedLevels.UNASSIGNED,
  })
  intended_level: AssignedLevels;

  @Column()
  subject: string;
}
