import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entity/card.entity';
import { ICard } from './types/interface';

@Injectable()
export class CardService {
    public constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
    ) {}

    public save(card: ICard): Promise<Card> {
        try {
            return this.cardRepository.save(card);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async showById(id: number) {
        try {
            return this.cardRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async showByCardNumber(id: number) {
        try {
            return this.cardRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
