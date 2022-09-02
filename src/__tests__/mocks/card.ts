import { ICard } from 'src/modules/card/types/interface';

const year = new Date().getFullYear();

export const cardMock = {
    id: 1,
    accountId: 1,
    cardNumber: 1000368121234562,
    digitValidator: 2,
    flag: 'visa',
    securityCode: 987,
    validThru: new Date(year + 4),
} as unknown as ICard;
