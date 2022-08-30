import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addAgencyAccountNumberPasswordAndFullPasswordToAccountTable1661812386301
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('account', [
            new TableColumn({
                name: 'agency',
                type: 'int',
                isNullable: false,
            }),
            new TableColumn({
                name: 'accountNumber',
                type: 'int',
                isNullable: false,
            }),
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: false,
            }),
            new TableColumn({
                name: 'fullPassword',
                type: 'varchar',
                isNullable: false,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('account', [
            'fullPassword',
            'password',
            'accountNumber',
            'agency',
        ]);
    }
}
