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
  })
  document_type: DocumentType;


  @Column()
  application_id: string;

  @Column()
  city: string;


  @Column({ length: 50 })
  document_number: string;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
  })
  marital_status: MaritalStatus;

  @Column({ type: 'varchar', length: 100 })
  profession: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province_or_state: string;

  @Column({ type: 'varchar', length: 100 })
  nationality: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  monthly_income: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  monthly_expenses: number;

  @Column({
    type: 'enum',
    enum: FinancialDependency,
    default: FinancialDependency.NO,
  })
  financial_dependency: FinancialDependency;

  @Column({ type: 'boolean', default: false })
  has_children: boolean;

  @Column({ type: 'smallint', default: 0 })
  children_0_4: number;

  @Column({ type: 'smallint', default: 0 })
  children_5_12: number;

  @Column({ type: 'smallint', default: 0 })
  children_13_18: number;

  @Column({ type: 'smallint', default: 0 })
  children_above_18: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
