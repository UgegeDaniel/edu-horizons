import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { AbstractEntity } from "./abstract-entity.entity";

enum AppointmentState {
    'UPCOMING',
    'PAST',
    'ONGOING'
}

@Entity('appointments')
export class Appointment extends AbstractEntity {
    
    @ManyToOne(() => User, user => user.appointments_to_host, { onDelete: "CASCADE"})
    host: User;

    @Column({
        type: "simple-array",
        nullable: false
    })
    attendees: User[];

    @Column({
        nullable: false
    })
    appointment_time: string;

    @Column()
    meeting_link: string;

    @Column()
    duration: string
    
    @Column()
    description: string

    @Column({
        type: 'enum',
        enum: AppointmentState,
        default: AppointmentState.UPCOMING
    })
    state: AppointmentState
 }
