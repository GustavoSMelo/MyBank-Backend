import { User } from 'src/modules/user/entity/user.entity';

export const userMock = {
    id: 1,
    email: 'test@mail.com',
    firstName: 'test',
    lastName: 'test',
    document: '123.456.789-00',
} as unknown as User;
