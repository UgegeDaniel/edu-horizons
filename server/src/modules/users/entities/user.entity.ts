import { GlobalEntity } from "src/modules/@database/global-entity.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";

// you can add length constraint to columns for number of characters
// check out check constraint for password column


// @ManyToOne(() => Category)
// @JoinColumn({ name: 'category_id' })
// category: Category;

// @Column('varchar', { array: true })
// tags: string[];

enum UserRoles { 'admin' , 'tutor' , 'student' , 'unassigned'}

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

    @Column()
    password: string;

    @Column({
        nullable: false
    })
    get fullName(): string {
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

    @Column()
    profileId: number;
    
    @OneToOne(() => Profile, profile=> profile.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    profile: Profile
 }
