import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './types/user.interface';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public save(user: IUser): Promise<User> {
        return this.userRepository.save(user);
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
