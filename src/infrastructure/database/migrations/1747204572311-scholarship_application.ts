import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ScholarshipApplication1747204572311 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE scholarship_application_status_enum AS ENUM ('COMPLETED', 'PENDING', 'IN_PROCESS')
    `);
    await queryRunner.query(`
      CREATE TYPE notification_language_enum AS ENUM ('es_ES', 'es_PR' , 'pt_PT','pt_BR', 'fr_FR', 'en_US', 'it_IT')
    `);
    await queryRunner.createTable(
      new Table({
        name: 'scholarship_application',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            isUnique: true,

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
            name: 'information_request_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'advisor_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'program_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'notification_language',
            type: 'notification_language_enum',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'scholarship_application_status_enum',
            isNullable: false,
            default: `'PENDING'`,
          },
        ],
      }),
    );
      await queryRunner.createForeignKey(
          "scholarship_application",
          new TableForeignKey({
            columnNames: ["applicant_uuid"],
            referencedTableName: "applicant",
            referencedColumnNames: ["uuid"],
            onDelete: "CASCADE",
          })
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scholarship_application');
    await queryRunner.query(`DROP TYPE scholarship_application_status_enum`);
    await queryRunner.query(`DROP TYPE notification_language_enum`);
  }
}
