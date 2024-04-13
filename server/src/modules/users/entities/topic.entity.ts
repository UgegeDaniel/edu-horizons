import { Column, Entity } from 'typeorm';
import { GlobalEntity } from 'src/modules/@database/global-entity.entity';
import { AssignedLevels } from './types';

@Entity('topic')
export class Topic extends GlobalEntity {
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
