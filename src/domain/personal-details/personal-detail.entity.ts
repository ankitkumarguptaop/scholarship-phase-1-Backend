import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DocumentType {
  NATIONAL_ID = 'National identity card',
  PASSPORT = 'Passport',
  FOREIGN_ID = "Foreigner's identity card",
  RUC = 'RUC',
  OTHER = 'Other',
}

export enum MaritalStatus {
  MARRIED = 'Married',
  SINGLE = 'Single',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated',
}

export enum FinancialDependency {
  YES = 'Yes',
  NO = 'No',
}

@Entity('personal_information')
export class PersonalInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DocumentType,
    nullable: true,
  })
  document_type?: DocumentType;

  @Column({ nullable: true })
  application_id?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  document_number?: string;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  marital_status?: MaritalStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profession?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date | string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province_or_state?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality?: string;

  @Column({ type: 'varchar',  nullable: true })
  monthly_income?: string;

  @Column({ type: 'varchar', nullable: true })
  monthly_expenses?: string;

  @Column({
    type: 'enum',
    enum: FinancialDependency,
    nullable: true,
  })
  financial_dependency?: FinancialDependency;

  @Column({ type: 'boolean', nullable: true })
  has_children?: boolean;

  @Column({ type: 'smallint', nullable: true })
  children_0_4?: number;

  @Column({ type: 'smallint', nullable: true })
  children_5_12?: number;

  @Column({ type: 'smallint', nullable: true })
  children_13_18?: number;

  @Column({ type: 'smallint', nullable: true })
  children_above_18?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
