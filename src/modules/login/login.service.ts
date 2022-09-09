import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
    public constructor(
        private readonly userService: UserService,
        private readonly accountService: AccountService,
    ) {}
    public async login(document: string, password: number) {
        const user = await this.userService.showByDocument(document);
        const account = await this.accountService.showAccountByUser(user);

        if (await bcrypt.compare(password.toString(), account.fullPassword)) {
            return jwt.sign(
                {
                    accountNumber: account.accountNumber.toString(),
                    userId: user.id,
                },
                process.env.JWT_PASSWORD,
                {
                    expiresIn: '1h',
                },
            );
        }

        return null;
    }
}
