import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { GlobalEntity } from "src/modules/@database/global-entity.entity";

// you can add length constraint to columns for number of characters
// check out check constraint for password column


// @ManyToOne(() => Category)
// @JoinColumn({ name: 'category_id' })
// category: Category;

// @Column('varchar', { array: true })
// tags: string[];

@Entity('profile')
export class Profile extends GlobalEntity {
    @Column({
        nullable: true
    })
    picture: string;

    @Column({
        nullable: true
    })
    phoneNumber: string;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    address: {
        houseNumber: string;
        street: string;
        city: string;
        country: string;
    };
    
    @Column({
        type: 'simple-json',
        nullable: true
    })
    edu_bg: {
        curr_institution: string;
        curr_program: string;
        upcoming_cert: string;
        year: string;
    }
    
    @Column({
        type: 'simple-array',
        nullable: true
    })
    interests: string[];
    
    @Column({
        nullable: true
    })
    bio: string;

    @OneToOne(() => User, user=> user.profile, {onDelete: 'CASCADE'})
    user: User
 }
