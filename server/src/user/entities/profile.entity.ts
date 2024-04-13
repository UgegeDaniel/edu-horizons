import { Column, Entity } from 'typeorm';
import { AssignedLevels, Days } from './types';
import { AbstractEntity } from './abstract-entity.entity';

//TO RESEARCH: make the assigned_level column nullable if the role is not student

@Entity('profile')
export class Profile extends AbstractEntity {
  @Column({
    nullable: true,
  })
  picture: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  address: {
    houseNumber: string;
    street: string;
    city: string;
    country: string;
  };

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  edu_bg: {
    curr_institution: string;
    curr_program: string;
    upcoming_cert: string;
    year: string;
  };

  @Column({
    nullable: true,
    type: 'enum',
    enum: AssignedLevels,
    default: AssignedLevels.UNASSIGNED,
  })
  assigned_level: AssignedLevels;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  interests: string[];

  @Column({
    nullable: true,
  })
  bio: string;
    
    @Column({
        nullable: true,
        type: 'enum',
        enum: Days,
    })
    preferred_meeting_days: Days[]
}
