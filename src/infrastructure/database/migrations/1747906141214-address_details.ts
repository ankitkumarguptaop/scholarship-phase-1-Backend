import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddressDetails1747906141214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address_details',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'scholarship_application_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'json',
            isNullable: false,
          },
          
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'address_details',
      new TableForeignKey({
        columnNames: ['scholarship_application_id'],
        referencedTableName: 'scholarship_application',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address_details');
  }
}
