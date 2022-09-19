import {
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
        @Inject()
        private readonly accountService: AccountService,
        @Inject()
        private readonly userService: UserService,
    ) {}

    public async transfer(
        idHost: number,
        idReceiver: number,
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

            helper = await this.userService.show(idReceiver);
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

    public async deposit(id: number, quantity: number): Promise<Account> {
        try {
            const account = await this.accountService.show(id);

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
