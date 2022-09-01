import { Account } from 'src/modules/account/entity/account.entity';

export interface ICard {
    id: number;
    flag: string;
    validThru: Date;
    securityCode: number;
    digitValidator: number;
    accountId: Account;
    cardNumber: number;
}
