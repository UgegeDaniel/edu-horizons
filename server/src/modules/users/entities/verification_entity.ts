import { Column, Entity } from "typeorm";
import { GlobalEntity } from "src/modules/@database/global-entity.entity";

@Entity('verification_token')
export class VerificationToken extends GlobalEntity {
    @Column()
    verification_token: string
 }
