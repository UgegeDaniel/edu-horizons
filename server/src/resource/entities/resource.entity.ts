import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../utils/abstract-entity.entity';
import { AssignedLevels } from 'src/utils/types';
import { Topic } from 'src/topic/entities/topic.entity';

@Entity('resource')
export class Resource extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  text: string;

  @Column({
    nullable: false,
    default: "UNASSIGNED",
  })
  intended_level: AssignedLevels;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];

  @Column()
  references: string[];
}
