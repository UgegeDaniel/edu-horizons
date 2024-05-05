import { Column, Entity, BeforeInsert } from "typeorm";
import { AbstractEntity } from "../../utils/abstract-entity.entity";
import { getConnection } from "typeorm";
import { VerificationTokenType } from "../utils/types";

@Entity('verification_token')
export class VerificationToken extends AbstractEntity {
    @Column()
    token: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: VerificationTokenType,
    })
    type: VerificationTokenType;

    @Column({ nullable: true })
    expiration_timestamp: Date;

    @BeforeInsert()
    async setExpirationTimestamp() {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);
        this.expiration_timestamp = expirationTime;
    }

    // Custom method to delete expired rows
    static async deleteExpiredTokens() {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(VerificationToken)
            .where("expiration_timestamp <= NOW()")
            .execute();
    }
}
