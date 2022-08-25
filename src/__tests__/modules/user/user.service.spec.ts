import { AccountService } from 'src/modules/account/account.service';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { accountMock } from 'src/__tests__/mocks/account';
import { userMock } from 'src/__tests__/mocks/user';
import { createMock } from 'ts-auto-mock';
import { DeleteResult, Repository } from 'typeorm';

describe('userService', () => {
    let userService: UserService;
    let accountService: AccountService;

    beforeAll(() => {
        const userRepository = createMock<Repository<User>>({
            find: jest.fn().mockReturnValue([userMock]),
            findOne: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
            update: jest.fn().mockResolvedValue(userMock),
            delete: jest.fn().mockResolvedValue(DeleteResult),
        });

        accountService = createMock<AccountService>({
            save: jest.fn().mockResolvedValue(accountMock),
        });

        userService = new UserService(userRepository, accountService);
    });

    test('if userService is defined', () => {
        expect(userService).toBeDefined();
    });

    test('method find is returning a array of User', async () => {
        expect(await userService.index()).toStrictEqual([userMock]);
    });

    test('method findOne is returning User', async () => {
        expect(await userService.show(userMock.id)).toBe(userMock);
    });

    test('method save is returning User', async () => {
        expect(await userService.save(userMock)).toBe(userMock);
    });

    test('method destroy is returning User', async () => {
        expect(await userService.destroy(userMock.id)).toBe(DeleteResult);
    });

    test('method update is returning User', async () => {
        expect(await userService.update(userMock.id, userMock)).toBe(userMock);
    });
});
