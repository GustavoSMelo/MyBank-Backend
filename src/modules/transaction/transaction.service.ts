import {
    forwardRef,
    HttpException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entity/account.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TransactionService {
    public constructor(
        @Inject(forwardRef(() => AccountService))
        private readonly accountService: AccountService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    public async transferByDocument(
        idHost: number,
        receiverDocument: string,
        quantity: number,
    ): Promise<void> {
        try {
            let helper = await this.userService.show(idHost);
            const host = await this.accountService.showAccountByUser(
                helper.userInfo,
            );

            if (host.balance < quantity) {
                throw new UnauthorizedException(
                    'You not have credits to transfer for your account',
                );
            }

            helper = await this.userService.showByDocument(receiverDocument);
            const receiver = await this.accountService.showAccountByUser(
                helper.userInfo,
            );

            host.balance -= quantity;
            receiver.balance += quantity;
        } catch (err) {
            console.error(err);
            throw new HttpException(
                `[Service: Transaction | Method: transfer] -> ${err}`,
                400,
            );
        }
    }

    public async transferByAccount(
        idHost: number,
        receiverAccountNumber: number,
        receiverAgency: number,
        quantity: number,
    ): Promise<void> {
        try {
            const { accountInfo: account } = await this.userService.show(
                idHost,
            );
            const accountReceiver =
                await this.accountService.showByAgencyAndAccountNumber(
                    receiverAgency,
                    receiverAccountNumber,
                );

            if (account.balance < quantity)
                throw new UnauthorizedException(
                    'You not have credits to transfer for your account',
                );

            account.balance -= quantity;
            accountReceiver.balance += quantity;
        } catch (err) {
            console.error(err);
            throw new HttpException(
                `[Service: Transaction | Method: deposit] -> ${err}`,
                400,
            );
        }
    }

    public async depositByAccountId(
        id: number,
        quantity: number,
    ): Promise<Account> {
        try {
            const account = await this.accountService.show(id);

            console.log(account);

            account.balance += quantity;

            return account;
        } catch (err) {
            console.error(err);
            throw new HttpException(
                `[Service: Transaction | Method: deposit] -> ${err}`,
                400,
            );
        }
    }

    public async depositByDocument(
        document: string,
        quantity: number,
    ): Promise<Account> {
        try {
            const account = await this.accountService.showByDocument(document);

            account.balance += quantity;

            return account;
        } catch (err) {
            console.error(err);
            throw new HttpException(
                `[Service: Transaction | Method: deposit] -> ${err}`,
                400,
            );
        }
    }

    public async depositByAccountAndAgency(
        accountNumber: number,
        agency: number,
        quantity: number,
    ): Promise<Account> {
        try {
            const account =
                await this.accountService.showByAgencyAndAccountNumber(
                    agency,
                    accountNumber,
                );

            account.balance += quantity;

            return account;
        } catch (err) {
            console.error(err);
            throw new HttpException(
                `[Service: Transaction | Method: deposit] -> ${err}`,
                400,
            );
        }
    }
}
