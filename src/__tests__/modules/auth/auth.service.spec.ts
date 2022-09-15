import { AccountService } from 'src/modules/account/account.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';
import { accountMock } from 'src/__tests__/mocks/account';
import { authMock } from 'src/__tests__/mocks/auth';
import { userMock } from 'src/__tests__/mocks/user';
import { createMock } from 'ts-auto-mock';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        const userService = createMock<UserService>({
            showByDocument: jest.fn().mockResolvedValue(userMock),
        });
        const accountService = createMock<AccountService>({
            showAccountByUser: jest.fn().mockResolvedValue(accountMock),
        });

        authService = new AuthService(userService, accountService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    test('if pass wrong information, login method should return null', async () => {
        expect(
            await authService.login(
                userMock.document,
                Number(accountMock.fullPassword),
            ),
        ).toBeNull();
    });

    test('if login method is returning a JWT', async () => {
        const { fullPassword } = accountMock;
        accountMock.fullPassword = authMock.passwordHash;
        process.env.JWT_PASSWORD = 'test';

        jest.spyOn(authService, 'login').mockResolvedValue(authMock.jwtKeyMock);

        expect(
            await authService.login(userMock.document, Number(fullPassword)),
        ).toBe(authMock.jwtKeyMock);
    });
});
