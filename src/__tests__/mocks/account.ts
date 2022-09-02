import { Account } from 'src/modules/account/entity/account.entity';
import { EAccount } from 'src/modules/account/types/account.enum';

export const accountMock = {
    id: 1,
    balance: EAccount.accountBalanceDefault,
    accountType: EAccount.accountTypeChecking,
    userId: {
        id: 1,
    },
    accountNumber: 123456,
    agency: EAccount.accountAgency,
    password: '9876',
    fullPassword: '987654',
} as Account;
