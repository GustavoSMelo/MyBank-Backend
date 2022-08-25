import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    document: string;
}
