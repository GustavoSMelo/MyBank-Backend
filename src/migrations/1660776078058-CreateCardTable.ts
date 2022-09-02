import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateCardTable1660776078058 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'card',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'flag',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'validThru',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'securityCode',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'digitValidator',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'accountId',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'card',
            new TableForeignKey({
                referencedTableName: 'account',
                referencedColumnNames: ['id'],
                columnNames: ['accountId'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('card', true);
    }
}
