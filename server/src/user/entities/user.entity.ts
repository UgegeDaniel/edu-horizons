import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "../../utils/abstract-entity.entity";
import { Appointment } from "../../appointments/entities/appointment.entity";
import { VerificationToken } from "./verification-token.entity";
import { Assesment } from "src/assesments/entities/assessment.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { AuthenticationStrategy, UserRoles } from "../utils/types";

@Entity('user')
export class User extends AbstractEntity {
    
    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    verified_email: boolean;

    @Column({
        nullable: false
    })
    strategy: AuthenticationStrategy;

    @Column({
        nullable: true
    })
    password: string;

    @Column({
        nullable: false
    })
    given_name: string;

    @Column({
        nullable: false
    })
    family_name: string;
    
    // get full_name(): string {
    //     return `${this.given_name} ${this.family_name}`;
    // }

    @Column({
        nullable: false,
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.UNASSIGNED
    })
    role: UserRoles;

    profileId: number;
    
    @OneToOne(() => Profile, profile=> profile.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    profile: Profile
    
    @OneToOne(() => VerificationToken, verificationToken=> verificationToken.id, {onDelete: 'SET NULL'})
    @JoinColumn()
    verification_token: VerificationToken

    verificationTokenId: number;

    @OneToMany(
        () => Appointment,
        appointment => appointment.host,
        { onDelete: 'CASCADE' }
    )
    appointments_to_host: Appointment[];

    @OneToMany(
        () => Assesment,
        assesment => assesment.assigned_by,
        { onDelete: 'CASCADE' }
    )
    assigned_assesments: Assesment[];

    @OneToMany(
        () => Assesment,
        assesment => assesment.assigned_to,
        { onDelete: 'CASCADE' }
    )
    assesments: Assesment[];

    @OneToMany(
        () => Payment,
        payment => payment.student,
        { onDelete: 'CASCADE' }
    )
    payments: Payment[];
}
