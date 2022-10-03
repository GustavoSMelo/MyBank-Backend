import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from 'src/modules/account/account.service';
import { Account } from 'src/modules/account/entity/account.entity';
import { User } from './entity/user.entity';
import { IUser } from './types/user.interface';
import * as bcrypt from 'bcrypt';
import { EAccount } from 'src/modules/account/types/account.enum';
import { GenerateService } from 'src/modules/utils/services/generate.service';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => AccountService))
        private readonly accountService: AccountService,
        private readonly generateService: GenerateService,
    ) {}

    public async save(
        user: IUser,
        password: number,
        fullPassword: number,
    ): Promise<User> {
        try {
            const userRegistred = await this.userRepository.save(user);

            const account = new Account();
            const salts = await bcrypt.genSalt(16);

            account.balance = EAccount.accountBalanceDefault;
            account.accountType = EAccount.accountTypeChecking;
            account.password = await bcrypt.hash(password.toString(), salts);
            account.fullPassword = await bcrypt.hash(
                fullPassword.toString(),
                salts,
            );
            account.agency = EAccount.accountAgency;
            account.accountNumber = this.generateService.numbersRandomly();
            account.userId = userRegistred;

            await this.accountService.save(account);

            return userRegistred;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    public index(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async show(
        id: number,
    ): Promise<{ userInfo: User; accountInfo: Account }> {
        const userInfo = await this.userRepository.findOne({ where: { id } });
        const accountInfo = await this.accountService.showAccountByUser(
            userInfo,
        );

        delete accountInfo.password;
        delete accountInfo.fullPassword;

        return { userInfo, accountInfo };
    }

    public async showByDocument(
        document: string,
    ): Promise<{ userInfo: User; accountInfo: Account }> {
        const userInfo = await this.userRepository.findOne({
            where: { document },
        });
        const accountInfo = await this.accountService.showAccountByUser(
            userInfo,
        );

        delete accountInfo.password;
        delete accountInfo.fullPassword;

        return { userInfo, accountInfo };
    }

    public async update(id: number, user: IUser): Promise<User> {
        const { userInfo } = await this.show(id);

        userInfo.email = user.email;
        userInfo.firstName = user.firstName;
        userInfo.lastName = user.lastName;
        userInfo.document = user.document;

        await this.userRepository.update(id, userInfo);

        return userInfo;
    }

    public destroy(id: number) {
        return this.userRepository.delete(id);
    }
}
