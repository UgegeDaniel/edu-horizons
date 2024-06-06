import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AbstractEntity } from '../../utils/abstract-entity.entity';

@Entity('appointments')
export class Appointment extends AbstractEntity {
  hostId: number;

  @ManyToOne(() => User, (user) => user.appointments_to_host, {
    onDelete: 'CASCADE',
  })
  host: User;

  @ManyToMany(() => User)
  @JoinTable()
  @Column({
    type: 'simple-array',
    nullable: false,
  })
  attendees: User[];

  @Column({
    nullable: false,
  })
  appointment_time: string;

  @Column()
  meeting_link: string;

  @Column()
  duration: string;

  @Column()
  description: string;
}
