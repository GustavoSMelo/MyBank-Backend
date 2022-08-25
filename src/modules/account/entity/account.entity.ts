import { User } from 'src/modules/user/entity/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'account' })
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    balance: number;

    @Column()
    accountType: string;

    @OneToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn()
    userId: User;
}
