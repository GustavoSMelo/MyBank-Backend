import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateAccountTable1660775022323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'account',
                columns: [
                    {
                        name: 'id',
                        isPrimary: true,
                        isGenerated: true,
                        type: 'int',
                    },
                    {
                        name: 'balance',
                        isNullable: false,
                        type: 'decimal',
                        default: 0.0,
                    },
                    {
                        name: 'accountType',
                        isNullable: false,
                        type: 'varchar',
                    },
                    {
                        name: 'userId',
                        isNullable: false,
                        type: 'int',
                        unsigned: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'account',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account', true);
    }
}
