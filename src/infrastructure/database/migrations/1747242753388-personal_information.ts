import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PersonalInformation1747242753388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "personal_information",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "application_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "document_type",
            type: "enum",
            enumName: "document_type_enum",
            enum: [
              "National identity card",
              "Passport",
              "Foreigner's identity card",
              "RUC",
              "Other",
            ],
            isNullable: true,
          },
          {
            name: "document_number",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "marital_status",
            type: "enum",
            enumName: "marital_status_enum",
            enum: ["Married", "Single", "Divorced", "Widowed", "Separated"],
            isNullable: true,
          },
          {
            name: "profession",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "date_of_birth",
            type: "date",
            isNullable: true,
          },
          {
            name: "country",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "province_or_state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nationality",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "monthly_income",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "monthly_expenses",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "financial_dependency",
            type: "enum",
            enumName: "financial_dependency_enum",
            enum: ["Yes", "No"],
            default: `'No'`,
            isNullable: true,
          },
          {
            name: "has_children",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "children_0_4",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "children_5_12",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "children_13_18",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "children_above_18",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "personal_information",
      new TableForeignKey({
        columnNames: ["application_id"],
        referencedTableName: "scholarship_application",
        referencedColumnNames: ["uuid"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("personal_information");
    await queryRunner.query(`DROP TYPE IF EXISTS "document_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "marital_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "financial_dependency_enum"`);
  }
}
