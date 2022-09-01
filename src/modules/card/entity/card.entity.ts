import { Account } from 'src/modules/account/entity/account.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    flag: string;

    @Column()
    validThru: Date;

    @Column()
    securityCode: number;

    @Column()
    digitValidator: number;

    @Column()
    cardNumber: number;

    @OneToOne(() => Account, (account) => account.id, { cascade: true })
    @JoinColumn({ name: 'accountId' })
    accountId: Account;
}
