import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

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
            isNullable: false,
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
          },
          {
            name: "document_number",
            type: "varchar",
            length: "50",
          },
          {
            name: "marital_status",
            type: "enum",
            enumName: "marital_status_enum",
            enum: ["Married", "Single", "Divorced", "Widowed", "Separated"],
          },
          {
            name: "profession",
            type: "varchar",
            length: "255",
          },
          {
            name: "date_of_birth",
            type: "date",
          },
          {
            name: "country",
            type: "varchar",
          },
          {
            name: "province_or_state",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "nationality",
            type: "varchar",
          },
          {
            name: "monthly_income",
            type: "numeric",
            precision: 12,
            scale: 2,
          },
          {
            name: "monthly_expenses",
            type: "numeric",
            precision: 12,
            scale: 2,
          },
          {
            name: "financial_dependency",
            type: "enum",
            enumName: "financial_dependency_enum",
            enum: ["Yes", "No"],
            default: `'No'`,
          },
          {
            name: "has_children",
            type: "boolean",
            default: false,
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
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
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
