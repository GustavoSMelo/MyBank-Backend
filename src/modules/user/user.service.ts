import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entity/account.entity';
import { User } from './entity/user.entity';
import { IUser } from './types/user.interface';
import * as bcrypt from 'bcrypt';
import { EAccount } from 'src/modules/account/types/account.enum';
import { Generate } from 'src/utils/generate';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly accountService: AccountService,
        private readonly generate: Generate,
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
            account.accountNumber = this.generate.numbersRandomly();
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

    public show(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    public async update(id: number, user: IUser): Promise<User> {
        const userRegistred = await this.show(id);

        userRegistred.email = user.email;
        userRegistred.firstName = user.firstName;
        userRegistred.lastName = user.lastName;
        userRegistred.document = user.document;

        await this.userRepository.update(id, userRegistred);

        return userRegistred;
    }

    public destroy(id: number) {
        return this.userRepository.delete(id);
    }
}
