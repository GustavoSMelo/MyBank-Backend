import { User } from 'src/modules/user/entity/user.entity';

export interface IAccount {
    id?: number;
    accountType: string;
    balance: number;
    userId: User;
}
