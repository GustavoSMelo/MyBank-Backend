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

    @OneToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    userId: User;
}
