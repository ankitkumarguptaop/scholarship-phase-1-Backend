import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ScholarshipApplication1747204572311 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE scholarship_application_status_enum AS ENUM ('COMPLETED', 'PENDING', 'IN_PROCESS')
    `);

    await queryRunner.createTable(
      new Table({
        name: 'scholarship_application',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'applicant_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'advisor_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'scholarship_application_status_enum',
            isNullable: false,
            default: `'PENDING'`,
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMP',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scholarship_application');
    await queryRunner.query(`DROP TYPE scholarship_application_status_enum`);
  }
}
