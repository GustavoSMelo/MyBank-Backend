import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnCardNumber1661813963218 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'card',
            new TableColumn({
                name: 'cardNumber',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('card', 'cardNumber');
    }
}
