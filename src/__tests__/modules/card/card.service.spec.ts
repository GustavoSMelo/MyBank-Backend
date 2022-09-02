import { CardService } from 'src/modules/card/card.service';
import { Card } from 'src/modules/card/entity/card.entity';
import { cardMock } from 'src/__tests__/mocks/card';
import { createMock } from 'ts-auto-mock';
import { Repository } from 'typeorm';

describe('CardService', () => {
    let cardService: CardService;

    beforeAll(() => {
        const cardRepository = createMock<Repository<Card>>({
            save: jest.fn().mockResolvedValue(cardMock),
            findOne: jest.fn().mockResolvedValue(cardMock),
        });

        cardService = new CardService(cardRepository);
    });

    test('if cardService is defined', () => {
        expect(cardService).toBeDefined();
    });

    test('if save method is returning card', async () => {
        expect(await cardService.save(cardMock)).toBe(cardMock);
    });

    test('if showById method is returning card', async () => {
        expect(await cardService.showById(cardMock.id)).toBe(cardMock);
    });

    test('if showByCardNumber method is returning card', async () => {
        expect(await cardService.showByCardNumber(cardMock.cardNumber)).toBe(
            cardMock,
        );
    });
});
