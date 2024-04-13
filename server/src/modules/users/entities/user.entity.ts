import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { GlobalEntity } from "src/modules/@database/global-entity.entity";
import { Appointment } from "./appointments.entity";
import { VerificationToken } from "./verification_entity";
import { Assesment } from "./assessment.entity";
import { Payment } from "./payment.entity";

enum UserRoles { 'admin', 'tutor', 'student', 'unassigned' }

/**
 * THIS ENTITY DEFINES THE AUTHENTICATION CREDENTIALS ( EMAIL, PASSWORD, GIVEN_NAME, FAMILY_NAME)
 * AND USER RELATIONSHIP TO OTHER ENTITIES : (PROFILE, VERIFICATION_TOKEN, APPONMENTS, ASSESSMENT,ASSIGNMENT)
 */

//TO RESEARCH: make the password column nullable if the strategy is local

@Entity('user')
export class User extends GlobalEntity {
    
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
    strategy: 'google' | 'local';

    @Column({
        nullable: true
    })
    password: string;

    @Column({
        nullable: false
    })
    get full_name(): string {
    return `${this.given_name} ${this.family_name}`;
    }
    
    @Column({
        nullable: false
    })
    given_name: string;

    @Column({
        nullable: false
    })
    family_name: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.unassigned
    })
    role: UserRoles;
    
    @OneToOne(() => Profile, profile=> profile.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    profile: Profile
    
    @OneToOne(() => VerificationToken, verificationToken=> verificationToken.id, {onDelete: 'CASCADE'})
    verification_token: VerificationToken

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
