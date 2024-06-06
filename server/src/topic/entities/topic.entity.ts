import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../utils/abstract-entity.entity';
import { AssignedLevels } from 'src/utils/types';
// import { User } from 'src/user/entities/user.entity';

@Entity('topic')
export class Topic extends AbstractEntity {
  @Column()
  title: string;

  // @Column()
  // tutor: User;

  @Column({
    nullable: false,
    default: "UNASSIGNED",
  })
  intended_level: AssignedLevels;

  @Column()
  subject: string;
}
