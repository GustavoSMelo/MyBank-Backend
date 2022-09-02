import { AccountService } from 'src/modules/account/account.service';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { GenerateService } from 'src/modules/utils/services/generate.service';
import { accountMock } from 'src/__tests__/mocks/account';
import { userMock } from 'src/__tests__/mocks/user';
import { createMock } from 'ts-auto-mock';
import { DeleteResult, Repository } from 'typeorm';
import {
    cardNumber,
    flags,
    flagsArray,
    numbersRandomly,
} from 'src/__tests__/mocks/generate';

describe('userService', () => {
    let userService: UserService;
    let accountService: AccountService;
    let generateService: GenerateService;

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

        generateService = createMock<GenerateService>({
            cardNumber: jest.fn().mockResolvedValue(cardNumber),
            flags: jest.fn().mockResolvedValue(flags),
            flagsArray: jest.fn().mockResolvedValue(flagsArray),
            numbersRandomly: jest.fn().mockResolvedValue(numbersRandomly),
        });

        userService = new UserService(
            userRepository,
            accountService,
            generateService,
        );
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
        expect(
            await userService.save(
                userMock,
                Number(accountMock.password),
                Number(accountMock.fullPassword),
            ),
        ).toBe(userMock);
    });

    test('method destroy is returning User', async () => {
        expect(await userService.destroy(userMock.id)).toBe(DeleteResult);
    });

    test('method update is returning User', async () => {
        expect(await userService.update(userMock.id, userMock)).toBe(userMock);
    });
});
