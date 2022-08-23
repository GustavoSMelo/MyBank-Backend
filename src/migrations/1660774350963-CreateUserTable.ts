import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1660774350963 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        isPrimary: true,
                        isGenerated: true,
                        type: 'int',
                    },
                    {
                        name: 'firstName',
                        isNullable: false,
                        type: 'varchar',
                    },
                    {
                        name: 'lastName',
                        isNullable: false,
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        isNullable: false,
                        isUnique: true,
                        type: 'varchar',
                    },
                    {
                        name: 'document',
                        isNullable: false,
                        isUnique: true,
                        type: 'varchar',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true);
    }
}
