import { Injectable } from '@nestjs/common';
import { Card } from 'src/modules/card/entity/card.entity';
import { ECard } from 'src/modules/card/types/enum';
import { ICard } from 'src/modules/card/types/interface';

@Injectable()
export class GenerateService {
    public numbersRandomly(rounds = 6): number {
        let numbers = '';

        for (let i = 0; i < rounds; i++) {
            numbers += Math.round(Math.random() * 9).toString();
        }

        return Number(numbers);
    }

    public flags(): string {
        const number = Math.round(Math.random() * 2).toString();

        return this.flagsArray()[number];
    }

    public cardNumber(card: ICard | Card, accountNumber: number): number {
        let cardNumber = '';

        cardNumber += this.flagsArray().indexOf(card.flag);
        cardNumber += '000';
        cardNumber += ECard.bankNumber;
        cardNumber += accountNumber;
        cardNumber += card.digitValidator;

        return Number(cardNumber);
    }

    public flagsArray(): Array<string> {
        const flags = ['masterCard', 'visa', 'elo'];

        return flags;
    }
}
