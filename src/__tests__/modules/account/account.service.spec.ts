import { AccountService } from 'src/modules/account/account.service';
import { Account } from 'src/modules/account/entity/account.entity';
import { CardService } from 'src/modules/card/card.service';
import { GenerateService } from 'src/modules/utils/services/generate.service';
import { accountMock } from 'src/__tests__/mocks/account';
import { cardMock } from 'src/__tests__/mocks/card';
import { createMock } from 'ts-auto-mock';
import { DeleteResult, Repository } from 'typeorm';
import {
    cardNumber,
    flags,
    flagsArray,
    numbersRandomly,
} from 'src/__tests__/mocks/generate';

describe('accountService', () => {
    let accountService: AccountService;
    let cardService: CardService;
    let generateService: GenerateService;

    beforeEach(() => {
        const accountRepository = createMock<Repository<Account>>({
            save: jest.fn().mockResolvedValue(accountMock),
            findOne: jest.fn().mockResolvedValue(accountMock),
            update: jest.fn().mockResolvedValue(accountMock),
            delete: jest.fn().mockResolvedValue(DeleteResult),
        });

        cardService = createMock<CardService>({
            save: jest.fn().mockResolvedValue(cardMock),
            showByCardNumber: jest.fn().mockResolvedValue(cardMock),
            showById: jest.fn().mockResolvedValue(cardMock),
        });

        generateService = createMock<GenerateService>({
            cardNumber: jest.fn().mockResolvedValue(cardNumber),
            flags: jest.fn().mockResolvedValue(flags),
            flagsArray: jest.fn().mockResolvedValue(flagsArray),
            numbersRandomly: jest.fn().mockResolvedValue(numbersRandomly),
        });

        accountService = new AccountService(
            accountRepository,
            cardService,
            generateService,
        );
    });

    test('if accoutService is defined', () => {
        expect(accountService).toBeDefined();
    });

    test('Create account method', async () => {
        expect(await accountService.save(accountMock)).toBe(accountMock);
    });

    test('Show account method', async () => {
        expect(await accountService.show(accountMock.id)).toBe(accountMock);
    });

    test('Update account method', async () => {
        expect(await accountService.update(accountMock.id, accountMock)).toBe(
            accountMock,
        );
    });

    test('destroy account method', async () => {
        expect(await accountService.destroy(accountMock.id)).toBe(DeleteResult);
    });
});
