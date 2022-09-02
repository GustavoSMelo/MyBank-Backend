import { GenerateService } from 'src/modules/utils/services/generate.service';
import { accountMock } from 'src/__tests__/mocks/account';
import { cardMock } from 'src/__tests__/mocks/card';
import {
    cardNumber,
    flags,
    flagsArray,
    numbersRandomly,
} from 'src/__tests__/mocks/generate';
import { createMock } from 'ts-auto-mock';

describe('GenerateService', () => {
    let generateService: GenerateService;

    beforeAll(() => {
        generateService = createMock<GenerateService>({
            cardNumber: jest.fn().mockReturnValue(cardNumber),
            flags: jest.fn().mockReturnValue(flags),
            flagsArray: jest.fn().mockReturnValue(flagsArray),
            numbersRandomly: jest.fn().mockReturnValue(numbersRandomly),
        });
    });

    test('if GenerateService is defined', () => {
        expect(generateService).toBeDefined();
    });

    test('if method cardNumber is returning a number', () => {
        expect(
            generateService.cardNumber(cardMock, accountMock.accountNumber),
        ).toBe(cardNumber);
    });

    test('if method flags is returning a number', () => {
        jest.spyOn(generateService, 'flags').mockReturnValue(flags);
        expect(generateService.flags()).toBe(flags);
    });

    test('if method flagsArray is returning flagsArray', () => {
        expect(generateService.flagsArray()).toBe(flagsArray);
    });

    test('if method numbersRandomly is returning a numbers', () => {
        jest.spyOn(generateService, 'numbersRandomly').mockReturnValue(
            numbersRandomly,
        );
        expect(generateService.numbersRandomly()).toBe(numbersRandomly);
    });
});
