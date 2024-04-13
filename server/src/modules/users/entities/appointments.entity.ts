import { Column, Entity, ManyToOne } from "typeorm";
import { GlobalEntity } from "src/modules/@database/global-entity.entity";
import { User } from "./user.entity";

enum AppointmentState {
    'UPCOMING',
    'PAST',
    'ONGOING'
}

@Entity('appointments')
export class Appointment extends GlobalEntity {
    
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
