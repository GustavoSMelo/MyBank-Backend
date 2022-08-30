import { User } from 'src/modules/user/entity/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    balance: number;

    @Column()
    accountType: string;

    @Column()
    agency: number;

    @Column()
    accountNumber: number;

    @Column()
    password: string;

    @Column()
    fullPassword: string;

    @OneToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    userId: User;
}
