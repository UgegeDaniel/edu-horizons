import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { GlobalEntity } from 'src/modules/@database/global-entity.entity';
import { AssignedLevels } from './types';
import { Topic } from './topic.entity';

@Entity('resource')
export class Resource extends GlobalEntity {
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
