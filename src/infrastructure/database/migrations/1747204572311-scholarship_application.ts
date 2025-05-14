import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ScholarshipApplication1747204572311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                    isNullable: false,
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
    }

}
