import { AccountService } from 'src/modules/account/account.service';
import { Account } from 'src/modules/account/entity/account.entity';
import { accountMock } from 'src/__tests__/mocks/account';
import { createMock } from 'ts-auto-mock';
import { DeleteResult, Repository } from 'typeorm';

describe('accountService', () => {
    let accountService: AccountService;

    beforeEach(() => {
        const accountRepository = createMock<Repository<Account>>({
            save: jest.fn().mockResolvedValue(accountMock),
            findOne: jest.fn().mockResolvedValue(accountMock),
            update: jest.fn().mockResolvedValue(accountMock),
            delete: jest.fn().mockResolvedValue(DeleteResult),
        });

        accountService = new AccountService(accountRepository);
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
