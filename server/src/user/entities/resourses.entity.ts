import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AssignedLevels } from './types';
import { Topic } from './topic.entity';
import { AbstractEntity } from './abstract-entity.entity';

@Entity('resource')
export class Resource extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  text: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AssignedLevels,
    default: AssignedLevels.UNASSIGNED,
  })
  intended_level: AssignedLevels;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];

  @Column()
  references: string[];
}
