import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CardService } from '../card/card.service';
import { ICard } from '../card/types/interface';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { GenerateService } from '../utils/services/generate.service';
import { Account } from './entity/account.entity';
import { IAccount } from './types/account.interface';

@Injectable()
export class AccountService {
    public constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly cardService: CardService,
        private readonly generateService: GenerateService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    public async save(account: IAccount): Promise<Account> {
        const accountRegistred = await this.accountRepository.save(account);

        const newCard = {
            accountId: accountRegistred.id,
            digitValidator: Number(this.generateService.numbersRandomly(1)),
            flag: this.generateService.flags(),
            validThru: new Date(new Date().getFullYear() + 5),
            securityCode: Number(this.generateService.numbersRandomly(3)),
        } as unknown as ICard;

        newCard.cardNumber = this.generateService.cardNumber(
            newCard,
            account.accountNumber,
        );

        this.cardService.save(newCard);

        return accountRegistred;
    }

    public show(id: number): Promise<Account> {
        return this.accountRepository.findOne({ where: { id } });
    }

    public showAccountByUser(userId: User): Promise<Account> {
        return this.accountRepository.findOne({ where: { userId } });
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

    public showByAgencyAndAccountNumber(
        agency: number,
        accountNumber: number,
    ): Promise<Account> {
        return this.accountRepository.findOne({
            where: {
                accountNumber,
                agency,
            },
        });
    }

    public async showByDocument(document: string): Promise<Account> {
        const { userInfo: user } = await this.userService.showByDocument(
            document,
        );

        return this.showAccountByUser(user);
    }
}
