import { User } from 'src/modules/user/entity/user.entity';

export interface IAccount {
    id?: number;
    accountType: string;
    balance: number;
    agency: number;
    accountNumber: number;
    password: string;
    fullPassword: string;
    userId: User;
}
