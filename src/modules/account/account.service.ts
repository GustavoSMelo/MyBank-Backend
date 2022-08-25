import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Account } from './entity/account.entity';
import { IAccount } from './types/account.interface';

@Injectable()
export class AccountService {
    public constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) {}

    public save(account: IAccount): Promise<Account> {
        return this.accountRepository.save(account);
    }

    public show(id: number): Promise<Account> {
        return this.accountRepository.findOne({ where: { id } });
    }

    public destroy(id: number): Promise<DeleteResult> {
        return this.accountRepository.delete(id);
    }

    public async update(id: number, account: IAccount): Promise<Account> {
        const accountRegistred = await this.show(id);

        accountRegistred.balance = account.balance;
        accountRegistred.accountType = account.accountType;

        await this.accountRepository.save(account);

        return accountRegistred;
    }
}
