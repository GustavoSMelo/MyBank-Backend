import { Account } from 'src/modules/account/entity/account.entity';

export const accountMock = {
    id: 1,
    balance: 0.0,
    accountType: 'checking account',
    userId: {
        id: 1,
    },
} as Account;
