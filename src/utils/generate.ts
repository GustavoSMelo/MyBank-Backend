import { flags as arrayFlags } from 'src/utils/flags';

export class Generate {
    public numbersRandomly(rounds = 5): number {
        let numbers = '';

        for (let i = 0; i < rounds; i++) {
            numbers += Math.round(Math.random() * 9).toString();
        }

        return Number(numbers);
    }

    public flags() {
        const number = Math.round(Math.random() * 3).toString();

        return arrayFlags[number];
    }
}
