import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity.entity";

@Entity('verification_token')
export class VerificationToken extends AbstractEntity {
    @Column()
    verification_token: string
 }
